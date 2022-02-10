import { AWS_GATEWAY_ENDPOINT, AWS_API_KEY } from '@env';

const BASE_URL = AWS_GATEWAY_ENDPOINT;

const getPrediction = async (symbol: string) => {
  const response = await fetch(`${BASE_URL}?symbol=${symbol}`, {
    method: 'GET',
    headers: { 'X-API-KEY': AWS_API_KEY },
  });
  const data = await response.json();
  return data;
};

export { getPrediction };
