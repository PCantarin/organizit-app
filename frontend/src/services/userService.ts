import api from "./api";
import { jwtDecode } from "jwt-decode";

export type User = {
  id: number;
  name: string;
  username: string;
  role: string;
  createdAt: Date;
};

type UserToken = {
  id: number;
  name: string;
  username: string;
  role: string;
};

export function getUserFirstName() {
  const token = localStorage.getItem("token");

  if (!token) return "usuário";

  const data = jwtDecode<UserToken>(token);

  return data.name.split(" ")[0] ?? "usuário";
}

export async function getUsers(): Promise<User[]> {
  const response = await api.get<User[]>("/users");

  return response.data.map((user) => ({
    ...user,
    createdAt: new Date(user.createdAt),
  }));
}
