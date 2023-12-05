// api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type ApiConfig = {
    useBearerToken?: boolean;
    // Add other custom config options as needed
};

type InternalAxiosRequestConfig<T = any> = AxiosRequestConfig<T> & ApiConfig;

const API_BASE_URL = 'https://api.samsu-fpt.software/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const addBearerToken = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const useBearerToken = config.useBearerToken !== false; // Default to true if not provided
    if (useBearerToken) {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
    }
    return config;
};

api.interceptors.request.use(addBearerToken as any);

export const get = async <T>(endpoint: string, params = {}, config: InternalAxiosRequestConfig = {}): Promise<AxiosResponse<T, any>> => {
    try {
        const response = await api.get<T>(endpoint, { params, ...config });
        return response;
    } catch (error) {
        throw error;
    }
};

export const post = async <T>(endpoint: string, data = {}, config: InternalAxiosRequestConfig = {}): Promise<AxiosResponse<T, any>> => {
    try {
        const response = await api.post<T>(endpoint, data, config);
        return response;
    } catch (error) {
        throw error;
    }
};

export const put = async <T>(endpoint: string, data = {}, config: InternalAxiosRequestConfig = {}): Promise<AxiosResponse<T, any>> => {
    try {
        const response = await api.put<T>(endpoint, data, config);
        return response;
    } catch (error) {
        throw error;
    }
};

export const del = async <T>(endpoint: string, params = {}, config: InternalAxiosRequestConfig = {}): Promise<AxiosResponse<T, any>> => {
    try {
        const response = await api.delete<T>(endpoint, { params, ...config });
        return response;
    } catch (error) {
        throw error;
    }
};



// Add more functions for other HTTP methods as needed
