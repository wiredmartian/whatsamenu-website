import {$axios} from "@/api/common";
import {AxiosResponse} from "axios";

class Adapter {
    async get<T>(path: string, params?: string, queryParams?: string): Promise<AxiosResponse<T>> {
        let fullPath = path;
        if (params) {
            fullPath += `/${params}`
        }
        if (queryParams) {
            fullPath += `?${queryParams}`
        }
        return $axios.get(fullPath)
    }
}

export const apiAdapter = new Adapter()
