import { AWS_GATEWAY_ENDPOINT, AWS_API_KEY } from '@env';

const BASE_URL = AWS_GATEWAY_ENDPOINT;

const getPrediction = async (symbol: string) => {
  // Yahoo finance uses a different format to identify stocks on the LSE
  let reformattedString = symbol;
  if (symbol.substr(symbol.length - 4) === '.LON') {
    reformattedString = `${symbol.slice(0, symbol.length - 4)}.L`;
  }
  const response = await fetch(`${BASE_URL}?symbol=${reformattedString}`, {
    method: 'GET',
    headers: { 'X-API-KEY': AWS_API_KEY },
  });
  const data = await response.json();
  return data;
};

export { getPrediction };
