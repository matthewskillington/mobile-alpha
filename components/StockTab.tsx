import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStockData } from '../hooks/useStockData';

export type StockTabProps = {
    title: string,
}

export type StockTabItemProps = {
    symbol: string,
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#666',
        height: 300,
        width: '100%',
        borderRadius: 5,
        padding: 20
    },
    title: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 20
    },
    item: {
        paddingVertical: 5,
    },
    itemWrapper: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    itemText: {
        color: '#fff',
    }
})

const StockTabItem = ({symbol}: StockTabItemProps) => {

    const data = useStockData(symbol);

    if(data) {
        return (
            <View style={styles.item}>
                <Text style={styles.itemText}>{data.name}</Text>
                <View style={styles.itemWrapper}>
                   <Text style={styles.itemText}>{data.low}</Text>
                   <Text style={[styles.itemText, {marginLeft: 'auto'}]}>{data.high}</Text>
                </View>
            </View>   
           )
    } else {
        return (
            <Text>Loading...</Text>
        )
    }

    
}

const StockTab = ({title}: StockTabProps) => {
  return (
      <View style={styles.wrapper}>
          <Text style={styles.title}>{title}</Text>
          <StockTabItem
            symbol="IDEA.LON"/>
      </View>
  )
}

export { StockTab }
