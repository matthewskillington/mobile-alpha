import { useEffect, useState } from "react";
import { getQuotePrice } from "../api/alphaVantage";

type StockData = {
    name: string,
    high: number,
    low: number,
}

const GLOBAL_QUOTE = "Global Quote";
const SYMBOL = "01. symbol";
const HIGH = "03. high";
const LOW = "04. low";

const useStockData = (symbols: string[]) => {
    const [data, setData] = useState<StockData[] | undefined>();
    let stockData: StockData[] = [];

    const fetchData = async () => {
        await Promise.all(symbols.map(async (symbol: string) => {
            const result = await getQuotePrice(symbol);
            const globalQuote = result[GLOBAL_QUOTE];
            stockData.push({name: globalQuote[SYMBOL], high: globalQuote[HIGH], low: globalQuote[LOW]});
        }))
        setData(stockData);
    }

    useEffect(() => {
        fetchData();
    },[])

    return data;
}

export { useStockData }