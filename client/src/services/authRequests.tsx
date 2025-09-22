import httpRequester from "./axios.config";
import { isAxiosError } from "axios";
import type { Login, Register } from "../types/types";

export async function fetchLogin(user: Login) {
    try {
        const {data} = await httpRequester.post('/login', user);
        
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
}

export async function fetchRegister(user: Register) {
    try {
        const {data} = await httpRequester.post('/register', user);

        return data;
    } catch (error: unknown) {
        if(isAxiosError(error)) {
            return error.response?.data;
        }
    }
}

