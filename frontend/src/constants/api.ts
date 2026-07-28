export const API = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL,
};

export const API_ENDPOINTS = {
    // HTTP Endpoints
    MEALS: "/meals",
    TOKEN: "/token",
    DISPATCH_AGENT: "/dispatchAgent",

    // SSE Endpoints
    EVENTS: `${API.BASE_URL}/events`,
};