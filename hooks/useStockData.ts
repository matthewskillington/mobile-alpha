import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getQuotePrice } from "../api/alphaVantage";

type StockData = {
    name: string,
    high: number,
    low: number,
    timeSaved?: number;
}

const GLOBAL_QUOTE = "Global Quote";
const SYMBOL = "01. symbol";
const HIGH = "03. high";
const LOW = "04. low";

const TenMinutes = 600000;

// If we last updated the stock a long time ago return true
const stockNeedsUpdate = (date: number) => {
    const timeDiff = Date.now() - date;
    if (timeDiff > TenMinutes){
        return true;
    } else {
        return false;
    }
}

const saveData = async (data: StockData[]) => {
    data.map(async (stock) => {
        stock.timeSaved = Date.now();
        const jsonValue = JSON.stringify(stock)
        await AsyncStorage.setItem(stock.name, jsonValue);
    })
}

const useStockData = (symbols: string[]) => {
    const [data, setData] = useState<StockData[] | undefined>();
    let stockData: StockData[] = [];
    let stocksToFetchFromAV: string[] = [];  

    const fetchData = async () => {
        // let's see if the data is already held locally and save us unneccessarily hitting the api
        await Promise.all(symbols.map(async (symbol: string) => {
            try {
                const stock = await AsyncStorage.getItem(symbol);
                const stockJson = stock != null ? JSON.parse(stock) as StockData : null;
                const needsUpdate = stockJson?.timeSaved ? stockNeedsUpdate(stockJson.timeSaved) : true;
                
                if(!stockJson || needsUpdate) {
                    stocksToFetchFromAV.push(symbol);
                } else {
                    stockData.push(stockJson);
                    console.log(`💾 Found stock in local storage ${symbol}`);
                }
            }
            catch (e){
                console.log("Error reading stock value from AsyncStorage", e);
            }
        }));
        
        await Promise.all(stocksToFetchFromAV.map(async (symbol: string) => {
            const result = await getQuotePrice(symbol);
            const globalQuote = result[GLOBAL_QUOTE];
            stockData.push({name: globalQuote[SYMBOL], high: globalQuote[HIGH], low: globalQuote[LOW]});
            console.log(`📲 Fetched stock on api ${symbol}`);
        }));
        setData(stockData);
        saveData(stockData);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return { data, fetchData };
}

export { useStockData }