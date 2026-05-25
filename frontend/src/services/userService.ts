import api from "./api";


export type User = {
    id: number;
    name: string;
    username: string;
    role: string;
    createdAt: string;
};


export async function getUsers(): Promise<User[]> {

    const token = localStorage.getItem("token");

    const response = await api.get(("/users"), {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data;
}