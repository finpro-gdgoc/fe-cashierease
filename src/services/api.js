import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        const res = await axios.post(
          "http://localhost:8080/api/v1/auth/refresh",
          { refresh_token: refreshToken }
        );

        const newAccessToken = res.data.access_token;
        localStorage.setItem("accessToken", newAccessToken);

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Failed to refresh token:", err);
        localStorage.clear();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
