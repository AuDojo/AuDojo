// BASE_URL: "/projects/audojo/" (from 'base' in vite.config.ts)
export const BASE_URL = import.meta.env.BASE_URL;
export const API_URL = import.meta.env.DEV ? `http://localhost:5001${BASE_URL}api` : `${BASE_URL}api`;
