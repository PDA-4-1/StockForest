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
