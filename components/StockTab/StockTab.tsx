import * as React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useQuoteData } from '../../hooks/useQuoteData';
import { StockTabItem } from '../StockItem';

import { RootTabNavigation } from '../../types';
import { SearchComponent } from '../SearchComponent';
import useUser from '../../hooks/useUser';
import { deleteStock, saveStock } from './update-stocks';
import { getFavourites } from '../../storage/AsyncStorage';

export type StockTabProps = {
  title: string,
  navigation: RootTabNavigation;
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
});

const StockTab = ({ title, navigation }: StockTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [stocks, setStocks] = useState<Array<string>>([]);
  const { user } = useUser();

  const { data, fetchData: refetchData } = useQuoteData(stocks);

  useEffect(() => {
    const getStocks = async () => {
      const newStocks = await getFavourites();
      setStocks(newStocks);
    };
    getStocks();
  }, []);

  const deleteItem = async (symbol: string) => {
    const newStocks = await deleteStock(user, symbol);
    setStocks(newStocks);
  };

  const addItem = async (symbol: string) => {
    const newStocks = await saveStock(user, symbol);
    setStocks(newStocks);
  };

  const onStockPress = (symbol: string) => {
    navigation.navigate('Modal', { symbol });
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
            <SearchComponent
              selectItem={addItem}
            />
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
            onPress={onStockPress}
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
