import axios from "axios";

const httpRequester = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default httpRequester;
