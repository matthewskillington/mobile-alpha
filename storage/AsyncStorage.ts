import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'firebase/auth';
import { FAV_STOCKS, PERSISTED_USER } from '../constants/Values';
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

const getFavourites = async (): Promise<string[]> => {
  const stocks = await AsyncStorage.getItem(FAV_STOCKS);
  const parsedStocks = stocks ? JSON.parse(stocks) : [];
  const newStocks = parsedStocks as string[];
  return newStocks || [];
};

const saveJSON = async (key: string, value: any) => {
  const dataToSave = value;
  dataToSave.timeSaved = Date.now();
  const stringValue = JSON.stringify(dataToSave);
  await AsyncStorage.setItem(key, stringValue);
};

const saveLoginInfo = (user: User) => {
  const stringValue = JSON.stringify(user);
  AsyncStorage.setItem(PERSISTED_USER, stringValue);
};

const deleteLoginInfo = () => {
  AsyncStorage.removeItem(PERSISTED_USER);
};

const getLoginInfo = async (): Promise<User | null> => {
  const info = await AsyncStorage.getItem(PERSISTED_USER);
  const parsed = info ? JSON.parse(info) as User : null;
  return parsed;
};

export {
  deleteStockAsFavourite, saveStockAsFavourite, getFavourites, saveJSON, saveLoginInfo, getLoginInfo, deleteLoginInfo,
};
