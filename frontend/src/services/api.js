import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor for unified error handling
api.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

// ── Services API ───────────────────────────────────────────────────────────────
export const servicesAPI = {
  getAll: (params = {}) => api.get("/services", { params }),
  getFeatured: () => api.get("/services/featured"),
  getCategories: () => api.get("/services/categories"),
  getBySlug: (slug) => api.get(`/services/${slug}`),
  create: (data) => api.post("/services", data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
  seed: () => api.post("/services/seed/all"),
};

export default api;
