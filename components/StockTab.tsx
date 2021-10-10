import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStockData } from '../hooks/useStockData';

export type StockTabProps = {
    title: string,
    stocks: string[] // array of stock symbols
}

export type StockTabItemProps = {
    name: string,
    low: number,
    high: number,
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

const StockTabItem = ({name, low, high}: StockTabItemProps) => {
    return (
        <View style={styles.item}>
            <Text style={styles.itemText}>{name}</Text>
            <View style={styles.itemWrapper}>
                <Text style={styles.itemText}>{low}</Text>
                <Text style={[styles.itemText, {marginLeft: 'auto'}]}>{high}</Text>
            </View>
        </View>   
        );
}

const StockTab = ({title, stocks}: StockTabProps) => {
    const data = useStockData(stocks);
    
    if(data){
        return (
            <View style={styles.wrapper}>
                <Text style={styles.title}>{title}</Text>
                {data.map((stock) => 
                    <StockTabItem 
                        name={stock.name} 
                        low={stock.low} 
                        high={stock.high} 
                        key={stock.name}/>)
                        }
            </View>
        )
    } else {
        return (
            <Text>Loading...</Text>
        )
    }
    
}

export { StockTab }
