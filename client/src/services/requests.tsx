import axios from "axios";
import type { Form } from "../types/types";

export const httpRequester = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

export async function getForms() {
    try {
        const {data} = await httpRequester.get('/forms');

        console.log(data);

        return data;
    } catch (error) {
        console.error('Error fetching forms:', error);
        return [];
        //throw error;
    }
}

export async function createForm(form: Form) {
    try {
        const {data} = await httpRequester.post('/forms', form);

        console.log(data);

        return data;
    } catch (error) {
        console.error('Error creating form:', error);
        return null;
        //throw error;
    }
}