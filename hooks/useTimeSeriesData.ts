/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { getDailyPrice } from '../api/alphaVantage';

const TIME_SERIES_DAILY = 'Time Series (Daily)';

type TimeSeriesDaily = {
  [key: string] : {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  }
};

type TimeSpan = '1 month' | '3 months' | '6 months' | '1 year';

const getLabels = (keys: string[]) => {
  const firstDay = new Date(Date.parse(keys[0]));
  const threeMonthsAgo = new Date(
    new Date(firstDay).getFullYear(),
    new Date(firstDay).getMonth() - 3,
    new Date(firstDay).getDate(),
  );
  const year = threeMonthsAgo.getUTCFullYear();
  const month = threeMonthsAgo.getUTCMonth();
  const day = threeMonthsAgo.getUTCDate();
  const lastKey = `${year}-${month}-${day}`;
  const ThreeMonthsOfKeys = keys.slice(0, keys.indexOf(lastKey));
  console.log('👀', ThreeMonthsOfKeys.length);
};

// TODO: Update to support multiple timespans
const convertTimeSeriesDailyToGraphData = (data: TimeSeriesDaily, timeSpan: TimeSpan = '3 months') => {
  const keys = Object.keys(data);

  const labels = getLabels(keys);
  // const result = keys.map((key) => ({
  //   label: getLabel(data[key]),
  //   averagePrice: getAveragePrice(data[key]),
  // }));
};

const useTimeSeriesData = (symbol: string) => {
  const [data, setData] = useState({});

  const fetchData = async () => {
    const result = await getDailyPrice(symbol);
    if (result.Note) {
      console.log('API limit reached');
    }
    const timeSeriesDaily = result[TIME_SERIES_DAILY];
    convertTimeSeriesDailyToGraphData(timeSeriesDaily);
  };

  useEffect(() => {
    fetchData();
  }, [symbol]);

  return { data };
};

export { useTimeSeriesData };
