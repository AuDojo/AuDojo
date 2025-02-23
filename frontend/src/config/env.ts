// BASE_URL: "/projects/audojo/" (from 'base' in vite.config.ts)
export const BASE_URL = import.meta.env.BASE_URL;
export const API_URL = import.meta.env.DEV ? "/api" : `${BASE_URL}api`;
