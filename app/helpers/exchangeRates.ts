import { getExchangeRate as AVGetExchangeRate } from '../../api/alphaVantage';
import { CurrencySymbol } from '../../types';

const REALTIME_CURRENCY_EXCHANGE_RATE = 'Realtime Currency Exchange Rate';
const EXCHANGE_RATE = '5. Exchange Rate';

const getExchangeRate = async (from: CurrencySymbol, to: CurrencySymbol): Promise<number> => {
  try {
    const exchangeResponse = await AVGetExchangeRate(from, to);
    const exchangeRate = exchangeResponse[REALTIME_CURRENCY_EXCHANGE_RATE][EXCHANGE_RATE];
    return exchangeRate;
  } catch (e) {
    console.log('Error fetching exchange rate', e);
    return 1;
  }
};

export { getExchangeRate };
