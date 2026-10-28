
import {API_BASE_URL} from "@/lib/api";

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    tokenType: "Bearer";
    expiresIn: number;
    user: {
      id: number;
      name: string;
      email: string;
      createdAt: string;
    };
  };
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = (await response.json()) as LoginResponse;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "ورود ناموفق بود");
  }

  return result.data;
}



interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
  };
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const result = (await response.json()) as RegisterResponse;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "ثبت‌نام ناموفق بود");
  }

  return result.data;
}
