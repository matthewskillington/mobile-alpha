import { getDatabase, ref, set } from 'firebase/database';

const setFavStocksForUser = (userId: string, stocks: Array<string>) => {
  const db = getDatabase();
  set(ref(db, `users/${userId}`), {
    favStocks: stocks,
  });
  console.log(`saved ${stocks.toString()} for ${userId}`);
};

export { setFavStocksForUser };
