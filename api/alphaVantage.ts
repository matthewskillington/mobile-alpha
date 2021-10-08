import { ALPHA_VANTAGE_API_KEY } from '@env';

const BASE_URL = "https://www.alphavantage.co"

const getDailyPrice = async (symbol: string): Promise<any> => {
    const response = await fetch(`${BASE_URL}/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${ALPHA_VANTAGE_API_KEY}`)
    const data = await response.json()
    return data;
}

const getQuotePrice = async(symbol: string): Promise<any> => {
    const response = await fetch(`${BASE_URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&outputsize=compact&apikey=${ALPHA_VANTAGE_API_KEY}`)
    const data = await response.json()
    return data;
}

export {
    getDailyPrice,
    getQuotePrice
}