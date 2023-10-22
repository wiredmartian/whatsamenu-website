import router from "@/router"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { Cookie } from "./cookie"

axios.defaults.baseURL = "http://localhost:9200/v1"
axios.defaults.timeout = 10000 // 10 seconds
// axios.defaults.baseURL = "https://whatsamenu.core.wiredmartians.com/v1"

axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = Cookie.get("auth_token")
        config.validateStatus = (status) => status >= 200 && status <= 404

        if (config.url?.includes("menu/enquire")) {
            config.timeout = 120000 // 2 minutes
        }
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(async (response: AxiosResponse) => {
    if (response.status === 401) {
        Cookie.remove("auth_token")
        await router.push({ name: "login" })
    }
    return response
})

export const $axios = axios

export const IMGCDN = "https://whatsamenu.core.wiredmartians.com"
export const MENU_API_V1 = "https://whatsamenu.core.wiredmartians.com/v1"
