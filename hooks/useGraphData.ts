/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { getPrices } from '../api/alphaVantage';
import { round } from '../helpers/helper';

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

enum TimeSpanOptions {
  'ThreeMonth' = 3,
  'SixMonth' = 6,
  'OneYear' = 12,
  'FiveYear' = 60,
}

type GraphData = {
  labels: string[];
  datasets: {
    data: number[];
    color: (opacity?: number) => string;
    strokeWidth: number;
  }[];
};

const graphColor = (opacity = 1) => `rgba(134, 65, 244, ${opacity})`;
const graphStroke = 4;

const convertTimeSeriesDataToGraphData = (data: TimeSeriesData, option: TimeSpanOptions = TimeSpanOptions.SixMonth) => {
  const keys = Object.keys(data);
  const labels = keys.slice(0, option);
  const result = labels.map((label) => ({
    label,
    averagePrice: round(parseFloat(data[label]['2. high']) + parseFloat(data[label]['3. low']) / 2),
  }));
  const graphFormat = {
    labels: result.map((object) => object.label),
    datasets: [
      {
        data: result.map((object) => object.averagePrice),
        color: graphColor,
        strokeWidth: graphStroke,
      },
    ],
  };
  return graphFormat;
};

const useGraphData = (symbol: string) => {
  const [data, setData] = useState<GraphData | undefined>();

  const fetchData = async () => {
    const result = await getPrices(symbol, 'TIME_SERIES_MONTHLY');
    if (result.Note) {
      console.log('API limit reached');
      return;
    }
    const timeSeriesData = result[TIME_SERIES_MONTHLY];
    const graphData = convertTimeSeriesDataToGraphData(timeSeriesData);
    setData(graphData);
    console.log('📉fetched graph data');
  };

  useEffect(() => {
    fetchData();
  }, [symbol]);

  return { data };
};

export { useGraphData };
