import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000", // 共通のベースURL
});

export default apiClient;