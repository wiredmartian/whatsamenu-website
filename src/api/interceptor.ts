import router from "@/router"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

const baseURL = process.env["VUE_APP_BASE_URL"]
const apiKey = process.env["VUE_APP_API_KEY"]

if (!baseURL) throw new Error(`VUE_APP_BASE_URL env not defined`)
if (!apiKey) throw new Error(`VUE_APP_API_KEY env not defined`)

axios.defaults.timeout = 10000 // 10 seconds
axios.defaults.baseURL = `${baseURL}/v1`

axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem("wm_auth_token")
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`
        } else if (config.headers) {
            config.headers["X-Api-Key"] = apiKey
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(async (response: AxiosResponse) => {
    if (response.status === 401) {
        localStorage.removeItem("wm_auth_token")
        await router.push({ name: "login" })
    }
    return response
})

export const $axios = axios

export const API_BASE_URL = baseURL
