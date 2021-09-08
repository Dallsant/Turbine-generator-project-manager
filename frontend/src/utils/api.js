import axios from "axios";
import { API_URL } from "./constants";
// import authHeader from "../services/authHeader";

export default axios.create({
  baseURL: API_URL,
  responseType: "json",
  // headers: authHeader(),
});
