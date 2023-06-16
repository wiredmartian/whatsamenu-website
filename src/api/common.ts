import axios, {AxiosRequestConfig} from "axios"

axios.defaults.baseURL = "http://localhost:9200/whatsamenu/v1"
axios.defaults.timeout = 10000 // 10 seconds
// axios.defaults.baseURL = "https://whatsamenu.core.wiredmartians.com/whatsamenu/v1"


axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        config.validateStatus = (status) => status >= 200 && status <= 404

        if (config.url?.includes('/gpt/enquire')) {
            config.timeout = 120000 // 2 minutes
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

export const IMGCDN = "https://whatsamenu.core.wiredmartians.com"
export const MENU_API_V1 = "http://localhost:9200/whatsamenu/v1"

