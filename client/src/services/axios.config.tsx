import axios from "axios";

const httpRequester = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

export default httpRequester;
