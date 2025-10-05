export interface Response<T=unknown> {
    data: T,
    message: string,
    status: string;
    errors?: any
}

export interface PaginatedResponse<T> extends Response<T> {
    meta: {
        total: number;
        from: number;
        to: number;
        count: number;
        per_page: number;
        current_page: number;
        last_page: number
    }
}

/**
 * Type predicate to check if an error is an Axios response error with a message
 */
export function isAxiosResponseError(error: unknown): error is {
    response: {
        data: {
            message: string;
        };
    };
} {
    return (
        error !== null &&
        typeof error === "object" && 
        "response" in error && 
        error.response !== null &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data !== null &&
        typeof error.response.data === "object" &&
        "message" in error.response.data &&
        typeof (error.response.data as any).message === "string"
    );
}