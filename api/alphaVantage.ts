import { ALPHA_VANTAGE_API_KEY } from '@env';

const BASE_URL = 'https://www.alphavantage.co';

type TimeSeriesOption = 'TIME_SERIES_DAILY' | 'TIME_SERIES_MONTHLY' | 'GLOBAL_QUOTE';

const getPrices = async (symbol: string, option: TimeSeriesOption = 'TIME_SERIES_MONTHLY') => {
  const response = await fetch(`${BASE_URL}/query?function=${option}&symbol=${symbol}&outputsize=compact&apikey=${ALPHA_VANTAGE_API_KEY}`);
  const data = await response.json();
  return data;
};

const searchStocks = async (searchTerm: string): Promise<any> => {
  const response = await fetch(`${BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${ALPHA_VANTAGE_API_KEY}`);
  const data = await response.json();
  return data;
};

export {
  getPrices,
  searchStocks,
};
