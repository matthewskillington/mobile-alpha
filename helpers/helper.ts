import { CurrencySymbol } from '../types';

const TenMinutes = 600000;

const arrayRemove = (arr: any, value: any) => arr.filter((element: any) => element !== value);

const round = (value: number): number => Math.round(value * 100) / 100;

const roundPercentage = (value: string): string => {
  const float = parseFloat(value);
  const rounded = round(float);
  return `${rounded}%`;
};

const getSymbolForCurrency = (currency: CurrencySymbol): string => (currency === 'USD' ? '$' : '£');

const getCurrencySymbolFromStockSymbol = (stockSymbol: string) => (stockSymbol.slice(-4) === '.LON' ? '£' : '$');

const getCurrencyFromStockSymbol = (stockSymbol: string) => (stockSymbol.slice(-4) === '.LON' ? 'GBP' : 'USD');

// If we last updated the stock a long time ago return true
const dataNeedsUpdate = (date: number, isGraphData?: boolean) => {
  const timeDiff = Date.now() - date;
  const timeThreshold = isGraphData ? TenMinutes * 144 : TenMinutes * 3;
  if (timeDiff > timeThreshold) {
    return true;
  }
  return false;
};

const getRecommendationHelper = (score: number) => {
  if (score <= 1) {
    return 'Strong buy';
  }
  if (score <= 2) {
    return 'Buy';
  }
  if (score <= 3) {
    return 'Hold';
  }
  if (score <= 4) {
    return 'Sell';
  }

  return 'Strong sell';
};

export {
  arrayRemove,
  round,
  roundPercentage,
  getSymbolForCurrency,
  getCurrencySymbolFromStockSymbol,
  getCurrencyFromStockSymbol,
  dataNeedsUpdate,
  getRecommendationHelper,
};
