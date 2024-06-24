import axios from "axios";

const BASE_URL = "/api/market";
const service = axios.create({ withCredentials: true, baseURL: BASE_URL });

export async function GetStockList(turn) {
    const res = await service.get(`/${turn}`);
    return res.data;
}

export async function GetStockChart(stockId, turn) {
    const res = await service.get(`${stockId}/${turn}`);
    return res.data;
}

export async function GetRanking() {
    const res = await service.get(`rank`);
    return res.data;
}

export async function SellStock(stockId, price, quantity) {
    const data = { stockId, price, quantity };
    const res = await service.post(`sell`, data);
    return res.data;
}

export async function BuyStock(stockId, price, quantity) {
    const data = { stockId, price, quantity };
    const res = await service.post(`buy`, data);
    return res.data;
}

export async function GetStockCount(stockId, turn) {
    const res = await service.get(`sell/${stockId}/${turn}`);
    return res.data;
}

export async function NextTurn(turn) {
    const res = await service.get(`next/${turn}`);
    return res.data;
}
