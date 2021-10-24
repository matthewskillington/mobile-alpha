import * as React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { useStockData } from '../hooks/useStockData';
import { searchStocks } from '../api/alphaVantage';
import { StockTabItem } from './StockItem';
import { addItemToStorage, deleteItemFromStorage } from '../storage/AsyncStorage';

const NAME = '2. name';
const SYMBOL = '1. symbol';

export type StockTabProps = {
  title: string,
  stocks: string[] // array of stock symbols
};

export type SearchSuggestion = {
  name: string,
  symbol: string,
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#666',
    width: '100%',
    borderRadius: 5,
    padding: 20,
  },
  title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
  topWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tabIcon: {
    marginLeft: 20,
  },
  rightIcons: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  searchWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: 10,

  },
  searchAndSuggestionWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  searchBar: {
    padding: 5,
    height: 45,
    flex: 1,
    fontSize: 18,
  },
  searchIcon: {
    padding: 10,
  },
  suggestionBox: {
    width: '100%',
    position: 'absolute',
    top: 55,
    backgroundColor: '#FFF',
  },
  suggestionItem: {
    flexDirection: 'row',
    padding: 10,
  },
  symbolText: {
    fontWeight: '700',
    color: '#297d96',
    flex: 1,
  },
  nameText: {
    flex: 6,
    textAlign: 'right',
    marginLeft: 10,
  },
  separator: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    margin: 5,
    backgroundColor: '#ccc',
  },
});

const StockTab = ({ title, stocks: initialStocks }: StockTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [stocks, setStocks] = useState(initialStocks);
  const [searchValue, setSearchValue] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>([]);
  const { data, fetchData: refetchData } = useStockData(stocks);

  const deleteItem = async (symbol: string) => {
    const newStocks = await deleteItemFromStorage(symbol);
    setStocks(newStocks);
  };

  const addItem = async (symbol: string) => {
    const newStocks = await addItemToStorage(symbol);
    setStocks(newStocks);
    setSearchSuggestions([]);
  };

  const getSuggestions = useCallback(debounce(async (text) => {
    if (!text) {
      return;
    }
    const bestMatches = await searchStocks(text);
    const suggestions: SearchSuggestion[] = [];
    bestMatches.bestMatches.forEach((suggestion: any) => {
      suggestions.push(
        { name: suggestion[NAME], symbol: suggestion[SYMBOL] },
      );
    });
    setSearchSuggestions(suggestions);
  }, 2000), []);

  const handleSearchChange = (text: string) => {
    setSearchValue(text);
    getSuggestions(text);
    // lets reset the suggestions if theres no text with no delay
    if (!text) {
      setSearchSuggestions([]);
    }
  };

  if (data) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.topWrapper}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.rightIcons}>
            <TouchableOpacity
              testID="editIcon"
              style={styles.tabIcon}
              onPress={() => setIsEditing(!isEditing)}
            >
              <AntDesign name="edit" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              testID="refreshIcon"
              style={styles.tabIcon}
              onPress={() => refetchData()}
            >
              <Feather name="refresh-ccw" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        {isEditing
          ? (
            <View style={styles.searchAndSuggestionWrapper}>
              <View style={styles.searchWrapper}>
                <AntDesign style={styles.searchIcon} name="search1" size={24} color="black" />
                <TextInput
                  testID="search-bar"
                  style={styles.searchBar}
                  value={searchValue}
                  onChangeText={handleSearchChange}
                />
              </View>
              <View style={styles.suggestionBox}>
                {searchSuggestions.map((suggestion: SearchSuggestion) => (
                  <TouchableOpacity
                    key={`${suggestion.name}${suggestion.symbol}`}
                    testID="suggestion-item"
                    onPress={() => addItem(suggestion.symbol)}
                  >
                    <View style={styles.suggestionItem}>
                      <Text style={styles.symbolText}>{suggestion.symbol}</Text>
                      <Text style={styles.nameText}>{suggestion.name}</Text>
                    </View>
                    <View style={styles.separator} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )
          : null}

        {data.map((stock) => (
          <StockTabItem
            symbol={stock.symbol}
            price={stock.price}
            changePercentage={stock.changePercentage}
            key={stock.symbol}
            isEditing={isEditing}
            deleteItem={deleteItem}
          />
        ))}
      </View>
    );
  }
  return (
    <Text>Loading...</Text>
  );
};

export { StockTab };
