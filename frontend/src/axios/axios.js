import axios from "axios";

const token = localStorage.getItem("token");
const header = {
    'X-BetaSeries-Key': process.env.REACT_APP_BETASERIES_KEY,
    'Authorization': `Bearer ${token}`
}
const instance = axios.create({
    baseURL: process.env.REACT_APP_BETASERIES_URL,
    headers: header
});

export default instance;