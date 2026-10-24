import axios from "axios";

export const client = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

client.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message =
            error.response?.data?.message ??
            error.response?.data?.error?.message ??
            "An unexpected error occurred";

        return Promise.reject(new Error(message));
    },
);