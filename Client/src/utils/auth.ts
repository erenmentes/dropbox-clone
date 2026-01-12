import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  exp: number;
  email : string;
}

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime + 60;
  } catch (e) {
    console.warn('Invalid token format', e);
    return true;
  }
};

export const getAccessToken = () => localStorage.getItem('access_token');
export const setAccessToken = (token: string) => localStorage.setItem('access_token', token);
export const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};