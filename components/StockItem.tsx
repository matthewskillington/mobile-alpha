import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type StockTabItemProps = {
  symbol: string,
  price: number,
  changePercentage: string,
  isEditing: boolean,
  deleteItem: (symbol: string) => void;
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 5,
    flexDirection: 'row',
    flex: 1,
    maxHeight: 60,
    zIndex: -1,
  },
  itemPriceWrapper: {
    flexDirection: 'row',
    paddingVertical: 5,
    width: '100%',
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    color: '#fff',
    fontSize: 18,
  },
  symbolText: {
    fontSize: 18,
    fontWeight: '700',
  },
  deleteIcon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
  changeText: {
    fontWeight: '700',
  },
});

const round = (value: number): number => Math.round(value * 100) / 100;

const roundPercentage = (value: string): string => {
  const float = parseFloat(value);
  const rounded = round(float);
  return `${rounded}%`;
};

const getChangePercentageElement = (changePercentage: string): JSX.Element => {
  const roundedPercentage = roundPercentage(changePercentage);
  return roundedPercentage.charAt(0) === '-'
    ? <Text style={[styles.itemText, styles.changeText, { marginLeft: 'auto', color: '#ff5252' }]}>{roundedPercentage}</Text>
    : <Text style={[styles.itemText, styles.changeText, { marginLeft: 'auto', color: '#39cc6d' }]}>{roundedPercentage}</Text>;
};

const StockTabItem = ({
  symbol, price, changePercentage, isEditing, deleteItem,
}: StockTabItemProps) => (
  <View style={styles.item}>
    <View style={styles.itemContent}>
      <Text style={[styles.itemText, styles.symbolText]}>{symbol}</Text>
      <View style={styles.itemPriceWrapper}>
        <Text style={styles.itemText}>{round(price)}</Text>
        {getChangePercentageElement(changePercentage)}
      </View>
    </View>
    {
      isEditing
        ? (
          <TouchableOpacity
            testID="deleteIcon"
            onPress={() => deleteItem(symbol)}
            style={styles.deleteIcon}
          >
            <Ionicons name="close-circle" size={24} color="white" />
          </TouchableOpacity>
        )
        : null
      }
  </View>
);

export { StockTabItem };
