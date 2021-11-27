import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAV_STOCKS } from '../constants/Values';
import { arrayRemove } from '../helpers/helper';

const deleteStockAsFavourite = async (symbol: string): Promise<string[]> => {
  const stocks = await AsyncStorage.getItem(FAV_STOCKS);
  const parsedStocks = stocks ? JSON.parse(stocks) : [] as string[];
  const newStocks = arrayRemove(parsedStocks, symbol);
  await AsyncStorage.setItem(FAV_STOCKS, JSON.stringify(newStocks));
  return newStocks || [];
};

const saveStockAsFavourite = async (symbol: string): Promise<string[]> => {
  const stocks = await AsyncStorage.getItem(FAV_STOCKS);
  const parsedStocks = stocks ? JSON.parse(stocks) : [];
  const newStocks = parsedStocks as string[];
  newStocks.push(symbol);
  await AsyncStorage.setItem(FAV_STOCKS, JSON.stringify(newStocks));
  return newStocks || [];
};

const saveJSON = async (key: string, value: any) => {
  const dataToSave = value;
  dataToSave.timeSaved = Date.now();
  const stringValue = JSON.stringify(dataToSave);
  await AsyncStorage.setItem(key, stringValue);
};

export { deleteStockAsFavourite, saveStockAsFavourite, saveJSON };
