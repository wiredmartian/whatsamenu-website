import {$axios} from "@/api/common";
import {AxiosResponse} from "axios";

class Adapter {
    async get<R>(path: string): Promise<AxiosResponse<R>> {
        return $axios.get<R>(path)
    }

    async putOrPost<P, R = never>(path: string, method: 'PUT' | 'POST', payload: P): Promise<AxiosResponse<R>> {
        if (method === 'PUT') {
            return $axios.put<R>(path, payload)
        }
        return $axios.post<R>(path, payload)
    }

    async delete<R>(path: string): Promise<AxiosResponse<R>> {
        return $axios.delete<R>(path)
    }
}

export const apiAdapter = new Adapter()
