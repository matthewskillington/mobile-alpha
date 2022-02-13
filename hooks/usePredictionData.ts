import { useEffect, useState } from 'react';
import { getPrediction } from '../api/aws';

const usePredictionData = (symbol: string) => {
  const [data, setData] = useState<any>();

  const fetchData = async () => {
    try {
      const result = await getPrediction(symbol);
      setData(result);
      console.log('📲 Fetched prediction from AWS');
    } catch (e) {
      console.log('Error reading prediction data from AWS Lambda Mobila-Alpha', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [symbol]);

  return { data };
};

export { usePredictionData };
