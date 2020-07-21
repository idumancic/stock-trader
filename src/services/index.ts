import axios from "axios";
import { StockTraderEndpoints } from "./types";

const instance = axios.create({
  baseURL: "https://stock-trader-61fc7.firebaseio.com/"
});

const endpoints: StockTraderEndpoints = {
  saveData: data => instance.put("data.json", data),
  loadData: () => instance.get("data.json")
};

export default endpoints;
