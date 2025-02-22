import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export class ApiService {
  async get(endpoint: string) {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async post(endpoint: string, data: any) {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
