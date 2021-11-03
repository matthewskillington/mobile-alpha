/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { getDailyPrice } from '../api/alphaVantage';
import { Months } from '../types';

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

const getLabels = (keys: string[]): string [] => {
  const firstDay = new Date(Date.parse(keys[0]));
  const firstMonth = firstDay.getUTCMonth();
  const labels: string [] = [];
  for (let i = 0; i < 3; i += 1) {
    if (Months[firstMonth - i] === undefined) {
      labels.push(Months[firstMonth - (i + 11)]);
    } else {
      labels.push(Months[firstMonth - i]);
    }
  }
  return labels;
};

// TODO: Update to support multiple timespans
const convertTimeSeriesDailyToGraphData = (data: TimeSeriesDaily, timeSpan: TimeSpan = '3 months') => {
  const keys = Object.keys(data);

  const labels = getLabels(keys);
  console.log(labels);
  // const result = keys.map((key) => ({
  //   label: getLabel(data[key]),
  //   averagePrice: getAveragePrice(data[key]),
  // }));
};

const useTimeSeriesData = (symbol: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState({});

  const fetchData = async () => {
    const result = await getDailyPrice(symbol);
    if (result.Note) {
      console.log('API limit reached');
      return;
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
