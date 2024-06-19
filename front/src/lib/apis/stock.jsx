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

export async function GetRanking(userId) {
    const res = await service.get(`rank/${userId}`);
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

export async function GetStockCount(id, stockId, turn) {
    const res = await service.get(`sell/${id}/${stockId}/${turn}`);
    return res.data;
}
