import apiClient from "../utils/api-client";
const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete apiClient.defaults.headers.common["x-auth-token"];
  }
};
// // Intercept 401 errors globally
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // 🔥 Handle invalid or expired token
//       localStorage.removeItem("token"); // or whatever key you use
//       // Optional: clear other auth-related items
//       window.location.href = "/login"; // Force logout
//     }

//     return Promise.reject(error);
//   }
// );
export default setAuthToken;
