import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useStockData } from '../hooks/useStockData';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export type StockTabProps = {
    title: string,
    stocks: string[] // array of stock symbols
}

export type StockTabItemProps = {
    name: string,
    low: number,
    high: number,
    isEditing: boolean,
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
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
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
    topWrapper: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    tabIcon: {
        marginLeft: 20,
    },
    rightIcons: {
        marginLeft: 'auto',
        flexDirection: 'row',
    },
    deleteIcon: {
        marginLeft: 10,
    }
})

const StockTabItem = ({name, low, high, isEditing}: StockTabItemProps) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemContent}>
                <Text style={styles.itemText}>{name}</Text>
                <View style={styles.itemPriceWrapper}>
                    <Text style={styles.itemText}>{low}</Text>
                    <Text style={[styles.itemText, {marginLeft: 'auto'}]}>{high}</Text>
                </View>
            </View>
            {
            isEditing ? 
            <Ionicons style={styles.deleteIcon} name="close-circle" size={24} color="white"/> 
            : null
            }
    
        </View>   
        );
}

const StockTab = ({title, stocks}: StockTabProps) => {
    const [ isEditing, setIsEditing ] = useState(false);
    const { data, fetchData: refetchData } = useStockData(stocks);
    
    if(data){
        return (
            <View style={styles.wrapper}>
                <View style={styles.topWrapper}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.rightIcons}>
                        <TouchableOpacity
                            style={styles.tabIcon}
                            onPress={() => setIsEditing(!isEditing)}>
                            <AntDesign name="edit" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tabIcon}
                            onPress={() => refetchData()}>
                            <Feather name="refresh-ccw" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                {data.map((stock) => 
                    <StockTabItem 
                        name={stock.name} 
                        low={stock.low} 
                        high={stock.high} 
                        key={stock.name}
                        isEditing={isEditing}/>)
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
