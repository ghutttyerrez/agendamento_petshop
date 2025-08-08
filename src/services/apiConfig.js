const env = import.meta.env || {};
const envUrl = env.VITE_API_URL;

export const apiConfig = {
  // Em produção, não usamos localhost automaticamente; exigimos VITE_API_URL
  baseURL:
    envUrl && envUrl.trim() ? envUrl : env.DEV ? "http://localhost:3333" : "",
};
