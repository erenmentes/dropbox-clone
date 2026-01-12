import { jwtDecode } from "jwt-decode";
import { Refresh } from "../api/Auth/Auth";

export const isLoggedIn = async (): Promise<boolean> => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
        try {
            const decoded = jwtDecode<{ exp: number }>(accessToken);
            if (!decoded?.exp) return false;

            const currentTime = Date.now() / 1000;
            if (decoded.exp > currentTime) {
                return true;
            }
        } catch (error) {
            console.warn("Access token decode failed", error);
            localStorage.removeItem("access_token");
        }
    }

    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return false;

    try {
        const result = await Refresh(refreshToken);
        localStorage.setItem("access_token", result.data.access_token);
        localStorage.setItem("refresh_token", result.data.refresh_token ?? refreshToken);
        console.log("Tokens refreshed");
        return true;
    } catch (error) {
        console.error("Refresh failed:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return false;
    }
};