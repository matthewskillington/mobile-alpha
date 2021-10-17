import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type StockTabItemProps = {
    name: string,
    low: number,
    high: number,
    isEditing: boolean,
    deleteItem: (symbol: string) => void;
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    flexDirection: 'row',
    flex: 1,
    maxHeight: 50,
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
  },
  deleteIcon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
});

const StockTabItem = ({
  name, low, high, isEditing, deleteItem,
}: StockTabItemProps) => (
  <View style={styles.item}>
    <View style={styles.itemContent}>
      <Text style={styles.itemText}>{name}</Text>
      <View style={styles.itemPriceWrapper}>
        <Text style={styles.itemText}>{low}</Text>
        <Text style={[styles.itemText, { marginLeft: 'auto' }]}>{high}</Text>
      </View>
    </View>
    {
            isEditing
              ? (
                <TouchableOpacity
                  testID="deleteIcon"
                  onPress={() => deleteItem(name)}
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
