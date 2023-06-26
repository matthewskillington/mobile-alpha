import { renderHook } from '@testing-library/react-hooks';
import { StockData, useQuoteData } from '../useQuoteData';

const mockData = {
  'Global Quote': {
    '01. symbol': 'IBM',
    '02. open': '115.0000',
    '03. high': '116.3350',
    '04. low': '114.5600',
    '05. price': '115.8100',
    '06. volume': '3322012',
    '07. latest trading day': '2021-11-26',
    '08. previous close': '116.7300',
    '09. change': '-0.9200',
    '10. change percent': '-0.7881%',
  },
};

const mockGetItem = jest.fn();

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: () => mockGetItem(),
}));

const mockGetPrices = jest.fn();

jest.mock('../../api/alphaVantage', () => ({
  getPrices: () => mockGetPrices(),
}));

describe('useQuoteData', () => {
  beforeAll(() => {
    mockGetItem.mockImplementation(() => null);
    mockGetPrices.mockImplementation(() => (mockData));
  });

  it('should fetch data from api if its not saved locally', async () => {
    const props = ['IBM'];
    const { result, waitForNextUpdate } = renderHook(() => useQuoteData(props));

    await waitForNextUpdate();

    const hookResult = result.current.data as StockData[];
    expect(hookResult[0].symbol).toEqual('IBM');
    expect(hookResult[0].high).toEqual('116.3350');
    expect(hookResult[0].low).toEqual('114.5600');
  });
  it('should fetch data from local storage if its saved locally', async () => {
    mockGetItem.mockImplementation(() => `{"symbol":"IBM","high":"116.3350","low":"114.5600","price":"115.8100","changePercentage":"-0.7881%","timeSaved":"${Date.now().toString()}"}`);
    const props = ['IBM'];
    const { result, waitForNextUpdate } = renderHook(() => useQuoteData(props));

    await waitForNextUpdate();

    const hookResult = result.current.data as StockData[];
    expect(hookResult[0].symbol).toEqual('IBM');
    expect(hookResult[0].high).toEqual('116.3350');
    expect(hookResult[0].low).toEqual('114.5600');
  });
});
