import apiClient from "../utils/api-client";
import { jwtDecode } from "jwt-decode";

const tokenName = "token";
export async function signup(userData, profile) {
  const body = new FormData();
  body.append("name", userData.name);
  body.append("email", userData.email);
  body.append("password", userData.password);
  body.append("deliveryAddress", userData.address);
  body.append("profilePic", profile);
  const { data } = await apiClient.post("/user/signup", body);
  localStorage.setItem("token", data.token);
}
export async function login(userData) {
  const { data } = await apiClient.post("/user/login", userData);
  localStorage.setItem(tokenName, data.token);
}
export function logout() {
  localStorage.removeItem(tokenName);
}

export function getUser() {
  try {
    const jwt = localStorage.getItem(tokenName);

    // ✅ Check if jwt is a valid string
    if (!jwt || typeof jwt !== "string") return null;

    const decoded = jwtDecode(jwt);

    // Optional: check for expiration
    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem(tokenName);
      return null;
    }

    return decoded;
  } catch (err) {
    // If decoding fails (e.g. malformed token), remove it
    localStorage.removeItem(tokenName);
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenName);
}
