/**
 * Handler for http errors
 *
 * I expect 400, 401 , 404 & 500
 *
 * The response data will have an `error` attribute which is the error message
 */

import { HttpResponseError } from "@/types"

type HttpErrorStatus = 400 | 401 | 404 | 500

export const handleHttpError = (err: unknown | any) => {
    const httpStatus: HttpErrorStatus | undefined = err?.response?.status
    const errorResponse: HttpResponseError = err?.response?.data

    if (httpStatus && errorResponse) {
        return errorResponse
    }
}
