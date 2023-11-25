import router from "@/router"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

const baseURL = process.env.VUE_APP_API_BASE_URL

if (!baseURL) {
    throw new Error("VUE_APP_API_BASE_URL is not set")
}

axios.defaults.timeout = 10000 // 10 seconds
axios.defaults.baseURL = `${baseURL}/v1`

axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem("_token")
        config.validateStatus = (status) => status >= 200 && status <= 404
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
        localStorage.removeItem("_token")
        await router.push({ name: "login" })
    }
    return response
})

export const $axios = axios

export const IMGCDN = baseURL
export const MENU_API_V1 = `${baseURL}/v1`
