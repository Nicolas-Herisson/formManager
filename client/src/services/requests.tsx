import axios from "axios";

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