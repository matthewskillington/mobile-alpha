import React from 'react';
import { fireEvent, render, waitFor } from 'react-native-testing-library';
import _ from 'lodash';
import { StockTab } from '../StockTab/StockTab';

const mockStockData: any[] = [];
const mockFetch = jest.fn();
const mockSearchStocks = jest.fn();

jest.mock('../../hooks/useQuoteData', () => ({
  useQuoteData: () => ({
    data: mockStockData,
    fetchData: () => mockFetch(),
  }),
}));

jest.mock('../../api/alphaVantage', () => ({
  searchStocks: (text: string) => mockSearchStocks(text),
}));

const mockNavigation = jest.fn() as any;

// Mock debounce
_.debounce = jest.fn((fn) => fn) as any;

const renderComponent = () => render(
  <StockTab
    title="testTitle"
    stocks={['AAPL', 'IBM']}
    navigation={mockNavigation}
  />,
);

describe('StockTab', () => {
  it('should render', () => {
    const item = renderComponent();
    expect(item).toBeDefined();
  });

  it('should not render search bar initially', () => {
    const { getByTestId } = renderComponent();
    expect(() => getByTestId('search-bar')).toThrowError();
  });

  it('should render search bar when clicking edit icon', () => {
    const { getByTestId } = renderComponent();
    fireEvent.press(getByTestId('editIcon'));
    const searchBar = getByTestId('search-bar');
    expect(searchBar).toBeDefined();
  });

  it('should fetch data when clicking on refresh icon', () => {
    const { getByTestId } = renderComponent();
    fireEvent.press(getByTestId('refreshIcon'));
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call mockSearchStocks when text input is changed', async () => {
    const { getByTestId } = renderComponent();
    fireEvent.press(getByTestId('editIcon'));
    fireEvent.changeText(getByTestId('search-bar'), 'AAPL');
    await waitFor(() => {
      expect(mockSearchStocks).toHaveBeenCalledTimes(1);
      expect(mockSearchStocks).toHaveBeenCalledWith('AAPL');
    });
  });

  it('should render search suggestions when results are returned', async () => {
    mockSearchStocks.mockImplementation(() => ({
      bestMatches: [
        {
          '1. symbol': 'TSCO.LON',
          '2. name': 'Tesco PLC',
        },
        {
          '1. symbol': 'TSCDF',
          '2. name': 'Tesco plc',
        },
        {
          '1. symbol': 'TSCDY',
          '2. name': 'Tesco plc',
        },
      ],
    }));
    const { getAllByTestId, getByTestId } = renderComponent();
    fireEvent.press(getByTestId('editIcon'));
    fireEvent.changeText(getByTestId('search-bar'), 'AAPL');
    await waitFor(() => {
      expect(getAllByTestId('suggestion-item').length).toBe(3);
    });
  });
});
