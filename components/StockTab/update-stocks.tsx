import { UserCredential } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAV_STOCKS } from '../../constants/Values';
import { getFavStocksForUser, setFavStocksForUser } from '../../helpers/firebase-db-helper';
import { mergeArrayWithoutDuplicates } from '../../helpers/merge-array-without-duplicates';
import { deleteStockAsFavourite as deleteFavouriteOnAsyncStorage, saveStockAsFavourite as saveFavouriteToAsyncStorage, getFavourites as getFavouriteStocksOnAsyncStorage } from '../../storage/AsyncStorage';

const updateFireStoreDb = (userId: string, stocks: string[]) => {
  try {
    setFavStocksForUser(userId, stocks);
  } catch (e) {
    console.log('failed to update new stocks on db', e);
  }
};

const saveStockAsFavourite = async (user: UserCredential | undefined, symbol: string) => {
  const newStocks = await saveFavouriteToAsyncStorage(symbol);
  const userId = user?.user?.uid;
  if (userId) {
    updateFireStoreDb(userId, newStocks);
  }
  return newStocks;
};

const deleteStockAsFavourite = async (user: UserCredential | undefined, symbol: string) => {
  const newStocks = await deleteFavouriteOnAsyncStorage(symbol);
  const userId = user?.user?.uid;
  if (userId) {
    updateFireStoreDb(userId, newStocks);
  }
  return newStocks;
};

const getFavouriteStocks = async (user: UserCredential | undefined) => {
  const newStocks = await getFavouriteStocksOnAsyncStorage();
  const userId = user?.user?.uid;
  if (userId) {
    const stocksFromFirebase = await getFavStocksForUser(userId);
    const merged = mergeArrayWithoutDuplicates(stocksFromFirebase, newStocks);
    AsyncStorage.setItem(FAV_STOCKS, JSON.stringify(merged));
    return merged;
  }
  return newStocks;
};

export { saveStockAsFavourite as saveStock, deleteStockAsFavourite as deleteStock, getFavouriteStocks };
