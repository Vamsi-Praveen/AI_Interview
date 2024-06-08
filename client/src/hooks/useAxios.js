import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect } from "react";

const useAxios = () => {
    const { token } = useAuth();

    const API = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
    });

    useEffect(() => {
        if (token) {
            const authToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
            console.log(authToken)
            API.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        } else {
            delete API.defaults.headers.common['Authorization'];
        }
    }, [token]);

    return API;
};

export default useAxios;
