import axios from "axios";

import { NEST_API_BASE_URL } from "@/lib/api-config";

export const apiClient = axios.create({
  baseURL: NEST_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});