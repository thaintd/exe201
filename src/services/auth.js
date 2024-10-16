import { jwtDecode } from "jwt-decode";

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function decodeToken() {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

export function isLoggedIn() {
  const token = getToken();
  if (!token) return false;

  const decoded = decodeToken();
  if (!decoded) return false;

  const currentTime = Math.floor(Date.now() / 1000);
  if (decoded.exp < currentTime) {
    logout();
    return false;
  }
}

export function logout() {
  localStorage.removeItem("token");
}

export function getRole() {
  const decoded = decodeToken();
  return decoded ? decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : null;
}

export function getUserId() {
  const decoded = decodeToken();
  return decoded ? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] : null;
}
