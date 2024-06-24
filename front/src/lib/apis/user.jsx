import axios from "axios";

const BASE_URL = "/api/users";
const service = axios.create({ withCredentials: true, baseURL: BASE_URL });

export async function GetUserProfile() {
    const res = await service.get(``);
    return res.data;
}
