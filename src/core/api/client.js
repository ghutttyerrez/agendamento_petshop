import { apiConfig } from "../../services/apiConfig.js";

// normalizando a base URL
const baseURL = apiConfig.baseURL.replace(/\/$/, "");

// Função para buscar dados JSON
async function fetchJson(path, options = {}) {
  const url = `${baseURL}${path.startsWith("/") ? path : `/${path}`}`;
  const resp = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`HTTP ${resp.status} ${resp.statusText} - ${text}`);
  }
  //adiciona o header
  const contentType = resp.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return resp.json();
  return null;
}

export const apiClient = {
  fetchJson,
  get: (path) => fetchJson(path, { method: "GET" }),
  post: (path, body) =>
    fetchJson(path, { method: "POST", body: JSON.stringify(body) }),
  del: (path) => fetchJson(path, { method: "DELETE" }),
};

export default apiClient;
