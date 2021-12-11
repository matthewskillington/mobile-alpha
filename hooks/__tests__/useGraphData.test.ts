import { renderHook } from '@testing-library/react-hooks';
import { GraphData, useGraphData } from '../useGraphData';

const mockData = {
  'Meta Data': {
    '1. Information': 'Monthly Prices (open, high, low, close) and Volumes',
    '2. Symbol': 'IBM',
    '3. Last Refreshed': '2021-11-26',
    '4. Time Zone': 'US/Eastern',
  },
  'Monthly Time Series': {
    '2021-11-26': {
      '1. open': '125.0500',
      '2. high': '127.2900',
      '3. low': '114.5600',
      '4. close': '115.8100',
      '5. volume': '101049516',
    },
    '2021-10-29': {
      '1. open': '141.0000',
      '2. high': '146.0000',
      '3. low': '124.6200',
      '4. close': '125.1000',
      '5. volume': '144097758',
    },
    '2021-09-30': {
      '1. open': '139.9800',
      '2. high': '140.5700',
      '3. low': '132.7800',
      '4. close': '138.9300',
      '5. volume': '76644238',
    },
    '2021-08-31': {
      '1. open': '141.4500',
      '2. high': '144.7000',
      '3. low': '137.2100',
      '4. close': '140.3400',
      '5. volume': '69687056',
    },
    '2021-07-30': {
      '1. open': '146.9600',
      '2. high': '147.5000',
      '3. low': '136.2089',
      '4. close': '140.9600',
      '5. volume': '110625907',
    },
    '2021-06-30': {
      '1. open': '145.0000',
      '2. high': '152.8400',
      '3. low': '143.0400',
      '4. close': '146.5900',
      '5. volume': '84365220',
    },
    '2021-05-28': {
      '1. open': '143.8100',
      '2. high': '148.5150',
      '3. low': '140.9200',
      '4. close': '143.7400',
      '5. volume': '98036425',
    },
    '2021-04-30': {
      '1. open': '133.7600',
      '2. high': '148.7400',
      '3. low': '130.3800',
      '4. close': '141.8800',
      '5. volume': '122920494',
    },
    '2021-03-31': {
      '1. open': '120.3500',
      '2. high': '137.0700',
      '3. low': '118.7550',
      '4. close': '133.2600',
      '5. volume': '127967821',
    },
    '2021-02-26': {
      '1. open': '119.9000',
      '2. high': '124.3500',
      '3. low': '118.1200',
      '4. close': '118.9300',
      '5. volume': '106339228',
    },
    '2021-01-29': {
      '1. open': '125.8500',
      '2. high': '132.2400',
      '3. low': '117.3600',
      '4. close': '119.1100',
      '5. volume': '176168962',
    },
    '2020-12-31': {
      '1. open': '123.9000',
      '2. high': '127.6900',
      '3. low': '121.7200',
      '4. close': '125.8800',
      '5. volume': '102587006',
    },
    '2020-11-30': {
      '1. open': '112.6500',
      '2. high': '125.3130',
      '3. low': '111.1600',
      '4. close': '123.5200',
      '5. volume': '103461100',
    },
    '2020-10-30': {
      '1. open': '122.3600',
      '2. high': '135.5000',
      '3. low': '105.9200',
      '4. close': '111.6600',
      '5. volume': '159130911',
    },
    '2020-09-30': {
      '1. open': '122.8500',
      '2. high': '129.9500',
      '3. low': '116.4800',
      '4. close': '121.6700',
      '5. volume': '84510174',
    },
    '2020-08-31': {
      '1. open': '123.5000',
      '2. high': '130.4700',
      '3. low': '122.1500',
      '4. close': '123.3100',
      '5. volume': '74033007',
    },
    '2020-07-31': {
      '1. open': '120.2700',
      '2. high': '132.1700',
      '3. low': '115.2000',
      '4. close': '122.9400',
      '5. volume': '113972765',
    },
    '2020-06-30': {
      '1. open': '124.6400',
      '2. high': '135.8800',
      '3. low': '115.8800',
      '4. close': '120.7700',
      '5. volume': '120931250',
    },
    '2020-05-29': {
      '1. open': '123.1900',
      '2. high': '126.9700',
      '3. low': '111.8100',
      '4. close': '124.9000',
      '5. volume': '92864791',
    },
    '2020-04-30': {
      '1. open': '106.3600',
      '2. high': '129.3100',
      '3. low': '104.5200',
      '4. close': '125.5600',
      '5. volume': '130400316',
    },
    '2020-03-31': {
      '1. open': '130.7500',
      '2. high': '136.1000',
      '3. low': '90.5600',
      '4. close': '110.9300',
      '5. volume': '189585053',
    },
    '2020-02-28': {
      '1. open': '144.2500',
      '2. high': '158.7500',
      '3. low': '126.3600',
      '4. close': '130.1500',
      '5. volume': '118092333',
    },
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

describe('useGraphData', () => {
  beforeAll(() => {
    mockGetItem.mockImplementation(() => null);
    mockGetPrices.mockImplementation(() => mockData);
  });

  it('should fetch data from api if its not saved locally', async () => {
    const props = 'IBM';
    const { result, waitForNextUpdate } = renderHook(() => useGraphData(props));

    await waitForNextUpdate();

    const hookResult = result.current.data as GraphData;
    expect(hookResult.labels).toEqual(expect.arrayContaining(['06', '07', '08', '09', '10', '11']));
    expect(hookResult.datasets[0].data).toEqual(expect.arrayContaining([147.94, 141.85, 140.95, 136.68, 135.31, 120.93]));
  });
});
