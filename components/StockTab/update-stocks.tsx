import { UserCredential } from '@firebase/auth';
import { setFavStocksForUser } from '../../helpers/firebase-db-helper';
import { deleteStockAsFavourite as deleteFavouriteOnAsyncStorage, saveStockAsFavourite as saveFavouriteToAsyncStorage } from '../../storage/AsyncStorage';

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

export { saveStockAsFavourite as saveStock, deleteStockAsFavourite as deleteStock };
