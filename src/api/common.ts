import axios, {AxiosRequestConfig} from "axios"

axios.defaults.baseURL = "http://localhost:9200/api/v1"
axios.defaults.timeout = 10000
// axios.defaults.baseURL = "https://menu.core.wiredmartians.co.za/api/v1"


axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        config.validateStatus = (status) => status >= 200 && status <= 404
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//
// axios.interceptors.response.use(
//     (response: AxiosResponse) => response,
//     async (err: any) => {
//         if (err.response && err.response.status === 401) {
//             Cookie.remove("AUTH");
//             // await router.push({ path: "/sign-in" });
//         }
//         return Promise.reject(err);
//     }
// );

export const $axios = axios

export const IMGCDN = "http://localhost:9200"

