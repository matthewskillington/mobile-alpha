import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useStockData } from '../hooks/useStockData';
import { Feather } from '@expo/vector-icons';

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
    },
    topWrapper: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    refreshIcon: {
        marginLeft: 'auto',
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
    const { data, fetchData: refetchData } = useStockData(stocks);
    
    if(data){
        return (
            <View style={styles.wrapper}>
                <View style={styles.topWrapper}>
                    <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity
                        style={styles.refreshIcon}
                        onPress={() => refetchData()}>
                        <Feather name="refresh-ccw" size={24} color="white" />
                    </TouchableOpacity>
                </View>
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
