/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { getPrices } from '../api/alphaVantage';
import {
  dataNeedsUpdate, round,
} from '../helpers/helper';
import { saveJSON } from '../storage/AsyncStorage';

const TIME_SERIES_MONTHLY = 'Monthly Time Series';

type TimeSeriesData = {
  [key: string] : {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  }
};

export enum TimeSpanOptions {
  'ThreeMonth' = 3,
  'SixMonth' = 6,
  'OneYear' = 12,
  'ThreeYear' = 36,
  'FiveYear' = 60,
}

export type GraphData = LineChartData & {
  timeSaved?: number;
};

const graphColor = (opacity = 1) => `rgba(134, 65, 244, ${opacity})`;
const graphStroke = 4;

const convertTimeSeriesDataToGraphData = (data: TimeSeriesData, option: TimeSpanOptions) => {
  const keys = Object.keys(data);
  const labels = keys.slice(0, option);
  const result = labels.map((label) => {
    const averagePrice = round((parseFloat(data[label]['2. high']) + parseFloat(data[label]['3. low'])) / 2);
    return {
      label: label.substr(5, 2),
      averagePrice,
    };
  });
  const graphFormat = {
    labels: result.map((object) => object.label).reverse(),
    datasets: [
      {
        data: result.map((object) => object.averagePrice).reverse(),
        color: graphColor,
        strokeWidth: graphStroke,
      },
    ],
  };
  return graphFormat;
};

const saveData = async (data: GraphData, symbol: string) => {
  saveJSON(`${symbol}-Graph`, data);
};

const useGraphData = (symbol: string, timeSpanOption: TimeSpanOptions = TimeSpanOptions.OneYear) => {
  const [data, setData] = useState<GraphData | undefined>();

  const fetchData = async () => {
    // let's see if the data is already held locally and save us unneccessarily hitting the api
    try {
      const timeSeriesData = await AsyncStorage.getItem(`${symbol}-Graph`);
      const timesSeriesJSON = timeSeriesData != null ? JSON.parse(timeSeriesData) : null;
      const needsUpdate = timesSeriesJSON?.timeSaved ? dataNeedsUpdate(timesSeriesJSON.timeSaved, true) : true;

      if (timesSeriesJSON && !needsUpdate) {
        const graphData = convertTimeSeriesDataToGraphData(timesSeriesJSON, timeSpanOption);
        setData(graphData);
        console.log(`💾 Found graph data in local storage ${symbol}`);
        return;
      }
    } catch (e) {
      console.log('Error reading graph value from AsyncStorage', e);
    }

    const result = await getPrices(symbol, 'TIME_SERIES_MONTHLY');
    if (result.Note) {
      console.log('API limit reached');
      return;
    }
    const timeSeriesData = result[TIME_SERIES_MONTHLY];
    saveData(timeSeriesData, symbol);
    const graphData = convertTimeSeriesDataToGraphData(timeSeriesData, timeSpanOption);
    setData(graphData);
    console.log('📉fetched graph data');
  };

  useEffect(() => {
    fetchData();
  }, [symbol, timeSpanOption]);

  return { data };
};

export { useGraphData };
