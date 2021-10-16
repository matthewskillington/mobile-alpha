import React from 'react';
import { StockTabItem } from '../StockItem';
import { fireEvent, render } from 'react-native-testing-library';

const mockDeleteItem = jest.fn()

const renderComponent = (isEditing = false) => {
    return render(
        <StockTabItem
            name="title"
            low={200}
            high={300}
            isEditing={isEditing}
            deleteItem={mockDeleteItem}/>)
}

describe('StockItem', () => {

    it('should render', () =>  {
        const item = renderComponent();
        expect(item).toBeDefined(); 
    });

    it('should render title', () =>  {
        const { getByText } = renderComponent();
        const title = getByText('title');
        expect(title).toBeDefined();
        expect(title.props.children).toBe('title');
    });

    it('should render low price', () =>  {
        const { getByText } = renderComponent();
        const lowPrice = getByText('200');
        expect(lowPrice).toBeDefined();
        expect(lowPrice.props.children).toBe(200);
    });

    it('should render high price', () =>  {
        const { getByText } = renderComponent();
        const highPrice = getByText('300');
        expect(highPrice).toBeDefined();
        expect(highPrice.props.children).toBe(300);
    });

    it('should not render delete icon if isEditing is set to false', () =>  {
        const { getByTestId } = renderComponent();
        expect(() => getByTestId('deleteIcon')).toThrowError();
    });

    it('should render delete icon if isEditing is set to true', () =>  {
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
})