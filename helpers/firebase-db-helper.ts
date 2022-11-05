import {
  child,
  get, getDatabase, ref, set,
} from 'firebase/database';

const setFavStocksForUser = (userId: string, stocks: Array<string>) => {
  const db = getDatabase();
  set(ref(db, `users/${userId}`), {
    favStocks: stocks,
  });
  console.log(`saved ${stocks.toString()} for ${userId}`);
};

const getFavStocksForUser = async (userId: string) => {
  const dbRef = ref(getDatabase());
  const result = await get(child(dbRef, `users/${userId}`));
  return result;
};

export { setFavStocksForUser, getFavStocksForUser };
