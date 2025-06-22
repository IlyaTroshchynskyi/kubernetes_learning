
export const config = {
    ENV: process.env.NODE_ENV === 'development' ? process.env.VITE_ENV : window.runtimeConfig?.VITE_ENV,
    BASE_URL: process.env.NODE_ENV === 'development' ? process.env.VITE_BASE_URL : window.runtimeConfig?.VITE_BASE_URL,
    DESCRIPTION: process.env.NODE_ENV === 'development' ? process.env.VITE_DESCRIPTION : window.runtimeConfig?.VITE_DESCRIPTION,
}
