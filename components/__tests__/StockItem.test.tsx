import React from 'react';
import { fireEvent, render } from 'react-native-testing-library';
import { StockTabItem } from '../StockItem';

const mockDeleteItem = jest.fn();
let mockChangePercentage = '0.5083%';

const renderComponent = (isEditing = false) => render(
  <StockTabItem
    symbol="title"
    price={300}
    changePercentage={mockChangePercentage}
    isEditing={isEditing}
    deleteItem={mockDeleteItem}
  />,
);

describe('StockItem', () => {
  it('should render', () => {
    const item = renderComponent();
    expect(item).toBeDefined();
  });

  it('should render title', () => {
    const { getByText } = renderComponent();
    const title = getByText('title');
    expect(title).toBeDefined();
    expect(title.props.children).toBe('title');
  });

  it('should render price', () => {
    const { getByText } = renderComponent();
    const price = getByText('300');
    expect(price).toBeDefined();
    expect(price.props.children).toBe(300);
  });

  it('should render change percentage with correct formatting if positive', () => {
    const { getByText } = renderComponent();
    const changePercentage = getByText('0.51%');
    expect(changePercentage).toBeDefined();
    expect(changePercentage.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ marginLeft: 'auto', color: '#39cc6d' })]),
    );
  });

  it('should render change percentage with correct formatting if negative', () => {
    mockChangePercentage = '-1.4536%';
    const { getByText } = renderComponent();
    const changePercentage = getByText('-1.45%');
    expect(changePercentage).toBeDefined();
    expect(changePercentage.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ marginLeft: 'auto', color: '#ff5252' })]),
    );
  });

  it('should not render delete icon if isEditing is set to false', () => {
    const { getByTestId } = renderComponent();
    expect(() => getByTestId('deleteIcon')).toThrowError();
  });

  it('should render delete icon if isEditing is set to true', () => {
    const { getByTestId } = renderComponent(true);
    const deleteIcon = getByTestId('deleteIcon');
    expect(deleteIcon).toBeDefined();
  });

  it('should call delete function when pressing the delete icon', () => {
    const { getByTestId } = renderComponent(true);
    const deleteIcon = getByTestId('deleteIcon');
    fireEvent.press(deleteIcon);
    expect(mockDeleteItem).toHaveBeenCalledTimes(1);
  });
});
