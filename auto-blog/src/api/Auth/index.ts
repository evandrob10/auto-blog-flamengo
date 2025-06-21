import { CreateUserType } from "./interface";

export async function createUser(createUser: CreateUserType) {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(createUser),
  });
}

export async function auth(email: string, password: string) {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(response => response.json());
}
export async function verifyToken() {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verifyToken`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}
export async function logout() {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,{
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());
}
