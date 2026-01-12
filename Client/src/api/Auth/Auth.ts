import axios from "axios";

const BASE_URL = "http://localhost:3000";

interface LoginResponse {
  data: any;
}

export const Login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const result = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    return result;
  } catch (error) {
    throw error;
  }
};

export const Register = async (email : string, password : string) => {
  try {
    await axios.post(`${BASE_URL}/auth/register`, {email,password});
  } catch (error) {
    throw error;
  };
};

export const Refresh = async (refresh_token : string) => {
    try {
        const result = await axios.post(`${BASE_URL}/auth/refresh`, { refresh_token });
        return result;
    } catch (error) {
        throw error;
    };
};