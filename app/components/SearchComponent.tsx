import { AntDesign } from '@expo/vector-icons';
import debounce from 'lodash.debounce';
import React, { useCallback, useState } from 'react';
import {
  Text, StyleSheet, View, TextInput, TouchableOpacity,
} from 'react-native';
import { searchStocks } from '../../api/alphaVantage';

const NAME = '2. name';
const SYMBOL = '1. symbol';

export type SearchSuggestion = {
  name: string,
  symbol: string,
};

export type SearchComponentProps = {
  includeBorders?: boolean;
  setSelectedAsInputValue?: boolean; // Set the input value to be the selected item
  selectItem?: (symbol: string) => void // Provide function which handles what to do with the selected item
};

const styles = StyleSheet.create({
  searchWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: 0,
  },
  searchAndSuggestionWrapper: {
    position: 'relative',
    marginBottom: 10,
    marginTop: 10,
    zIndex: 2,
    elevation: 2,
  },
  border: {
    borderColor: '#666',
    borderWidth: 1,
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
    top: 45,
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

const SearchComponent = ({
  includeBorders = false,
  setSelectedAsInputValue = false,
  selectItem,
}: SearchComponentProps) => {
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>([]);
  const [searchValue, setSearchValue] = useState('');

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

  const handleItemSelected = (symbol: string) => {
    if (selectItem) {
      selectItem(symbol);
    }
    if (setSelectedAsInputValue) {
      setSearchValue(symbol);
    }
    setSearchSuggestions([]);
  };

  return (
    <View style={[styles.searchAndSuggestionWrapper, includeBorders ? styles.border : null]}>
      <View style={styles.searchWrapper}>
        <AntDesign style={styles.searchIcon} name="search1" size={24} color="black" />
        <TextInput
          testID="search-bar"
          style={styles.searchBar}
          value={searchValue}
          onChangeText={handleSearchChange}
        />
      </View>
      <View style={[styles.suggestionBox, includeBorders ? styles.border : null]}>
        {searchSuggestions.map((suggestion: SearchSuggestion) => (
          <TouchableOpacity
            key={`${suggestion.name}${suggestion.symbol}`}
            testID="suggestion-item"
            onPress={() => handleItemSelected(suggestion.symbol)}
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
  );
};

SearchComponent.defaultProps = {
  includeBorders: false,
  setSelectedAsInputValue: false,
  selectItem: () => {},
};

export { SearchComponent };
