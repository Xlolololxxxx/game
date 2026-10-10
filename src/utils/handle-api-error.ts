export type ApiErrorResponse = {
    message: string;
    details?: string;
}

export const handleApiError = (error: any) => {
    if (error.response) {
        switch (error.response.status) {
            case 500:
                return 'Internal Server Error. Please try again later.'
            case 401:
                return 'Unauthorized. Please login again.';
            default:
                return error.response.data.message || 'An error occurred. Please try again.';
        }
    } else if (error.request) {
        return `Network error: ${error.message}`
    } else {
        return `Error: ${error.message}`
    }
};