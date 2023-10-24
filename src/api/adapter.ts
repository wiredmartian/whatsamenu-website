import {$axios} from "@/api/common";
import {AxiosRequestConfig, AxiosResponse} from "axios";

class Adapter {
    async get<R>(path: string): Promise<AxiosResponse<R>> {
        return $axios.get<R>(path)
    }

    async putOrPost<P, R = any>(path: string, method: 'PUT' | 'POST', payload: P, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<R>> {
        if (method === 'PUT') {
            return $axios.put<R>(path, payload)
        }
        return $axios.post<R>(path, payload, config)
    }

    async delete<R>(path: string): Promise<AxiosResponse<R>> {
        return $axios.delete<R>(path)
    }
}

export const apiAdapter = new Adapter()
