import axios from "axios";
import applyCSRF from "../utils/applyCSRF";

const httpRequester = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

httpRequester.interceptors.request.use(
    (config) => {
        const csrfToken = document.cookie.split(';').find((cookie) => cookie.startsWith('csrfToken='))?.split('=')[1];
        
        if (csrfToken && applyCSRF(config.url!, config.method!)) {
            config.headers['X-CSRF-Token'] = csrfToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

httpRequester.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && 
            !originalRequest._retry && 
            originalRequest.url?.includes('/auth/refresh')) {

            originalRequest._retry = true;

            try {
                await httpRequester.post('/auth/refresh', {}, {withCredentials: true});
                return httpRequester(originalRequest);
            } catch (error) {
                console.log(error);
            }
        }

        return Promise.reject(error);
    }
);

export default httpRequester;
