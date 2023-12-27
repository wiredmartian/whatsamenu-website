import {$axios} from "@/api/common";
import {AxiosRequestConfig, AxiosResponse} from "axios";

class Adapter {
    async get<R>(path: string): Promise<AxiosResponse<R>> {
        return $axios.get<R>(path)
    }

    async post<P, R = any>(path: string, payload: P, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<R>> {
        return $axios.post<R>(path, payload, config)
    }

    async delete<R>(path: string): Promise<AxiosResponse<R>> {
        return $axios.delete<R>(path)
    }
}

export const apiAdapter = new Adapter()
