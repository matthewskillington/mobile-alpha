/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { getPrices } from '../api/alphaVantage';
import { dataNeedsUpdate } from '../helpers/helper';

type StockData = {
  symbol: string;
  high: number;
  low: number;
  price: number;
  changePercentage: string;
  name?: string;
  timeSaved?: number;
};

const GLOBAL_QUOTE = 'Global Quote';
const SYMBOL = '01. symbol';
const HIGH = '03. high';
const LOW = '04. low';
const PRICE = '05. price';
const CHANGEPERCENT = '10. change percent';

const saveData = async (data: StockData[]) => {
  data.map(async (stock) => {
    const stockToSave = stock;
    stockToSave.timeSaved = Date.now();
    const stringValue = JSON.stringify(stockToSave);
    await AsyncStorage.setItem(`${stockToSave.symbol}Quote`, stringValue);
  });
};

const useQuoteData = (symbols: string[]) => {
  const [data, setData] = useState<StockData[] | undefined>();
  const stockData: StockData[] = [];
  const stocksToFetchFromAV: string[] = [];

  const fetchData = async () => {
    // let's see if the data is already held locally and save us unneccessarily hitting the api
    await Promise.all(symbols.map(async (symbol: string) => {
      try {
        const stock = await AsyncStorage.getItem(`${symbol}Quote`);
        const stockJson = stock != null ? JSON.parse(stock) as StockData : null;
        const needsUpdate = stockJson?.timeSaved ? dataNeedsUpdate(stockJson.timeSaved) : true;

        if (!stockJson || needsUpdate) {
          stocksToFetchFromAV.push(symbol);
        } else {
          stockData.push(stockJson);
          console.log(`💾 Found stock in local storage ${symbol}`);
        }
      } catch (e) {
        console.log('Error reading stock value from AsyncStorage', e);
      }
    }));

    await Promise.all(stocksToFetchFromAV.map(async (symbol: string) => {
      try {
        const result = await getPrices(symbol, 'GLOBAL_QUOTE');
        if (result.Note) {
          console.log('API limit reached');
          return;
        }
        const globalQuote = result[GLOBAL_QUOTE];
        // Check there was a symbol returned from the api, if not its likely the response was malformed
        if (globalQuote[SYMBOL]) {
          stockData.push({
            symbol: globalQuote[SYMBOL],
            high: globalQuote[HIGH],
            low: globalQuote[LOW],
            price: globalQuote[PRICE],
            changePercentage: globalQuote[CHANGEPERCENT],
          });
        } else {
          throw new Error(`API response was malformed for ${symbol}`);
        }
        console.log(`📲 Fetched stock on api ${symbol}`);
      } catch (e) {
        console.log('Error reading stock value from AlphaVantage:', e);
      }
    }));
    setData(stockData);
    saveData(stockData);
  };

  useEffect(() => {
    fetchData();
  }, [symbols]);

  return { data, fetchData };
};

export { useQuoteData };
