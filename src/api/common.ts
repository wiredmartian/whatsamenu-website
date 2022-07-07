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
        if (config.url?.indexOf("/upload") !== -1) {
            config.headers["Content-Type"] = "multipart/form-data"
        }
        if (
            config.url?.indexOf("/user/sign-up") == -1 ||
            config.url?.indexOf("/user/sign-in") == -1
        ) {
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }
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

