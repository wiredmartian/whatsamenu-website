import axios, {AxiosRequestConfig} from "axios"

axios.defaults.baseURL = "http://localhost:9200/api/v1"
// axios.defaults.baseURL = "https://menu.core.wiredmartians.co.za/api/v1"


axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (!config.headers) {
            return Promise.reject("config headers is null")
        }
        const token = sessionStorage.getItem("menu_access_token");
        config.headers["Content-Type"] = "application/json";
        if (
            config.baseURL?.indexOf("/user/sign-up") == -1 ||
            config.baseURL?.indexOf("/user/sign-in") == -1
        ) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
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

