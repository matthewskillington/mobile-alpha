import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAV_STOCKS } from '../constants/Values';
import { arrayRemove } from '../helpers/helper';

const deleteItemFromStorage = async (symbol: string): Promise<string[]> => {
  const stocks = await AsyncStorage.getItem(FAV_STOCKS);
  const parsedStocks = stocks ? JSON.parse(stocks) : [] as string[];
  const newStocks = arrayRemove(parsedStocks, symbol);
  await AsyncStorage.setItem(FAV_STOCKS, JSON.stringify(newStocks));
  return newStocks || [];
};

const addItemToStorage = async (symbol: string): Promise<string[]> => {
  const stocks = await AsyncStorage.getItem(FAV_STOCKS);
  const parsedStocks = stocks ? JSON.parse(stocks) : [];
  const newStocks = parsedStocks as string[];
  newStocks.push(symbol);
  await AsyncStorage.setItem(FAV_STOCKS, JSON.stringify(newStocks));
  return newStocks || [];
};

export { deleteItemFromStorage, addItemToStorage };
