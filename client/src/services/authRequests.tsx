import httpRequester from "./axios.config";
import { isAxiosError } from "axios";
import type { Login, Register } from "../types/types";

export async function fetchLogin(user: Login) {
    try {
        const {data} = await httpRequester.post('/login', user);
        console.log("after login");
        return data;
    } catch (error) {
        if(isAxiosError(error)) {
            console.log("axios error");
            return error.response?.data.message;
        }
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
            return error.response?.data.message;
        }
        console.error('Error registering user:', error);
        return null;
    }
}

export async function fetchLogout() {
    try {
        const {data} = await httpRequester.post('/logout');

        return data;
    } catch (error) {
        console.error('Error logging out:', error);
        return null;
    }
}