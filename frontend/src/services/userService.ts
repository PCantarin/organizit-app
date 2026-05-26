import api from "./api";


export type User = {
    id: number;
    name: string;
    username: string;
    role: string;
    createdAt: Date;
};


export async function getUsers(): Promise<User[]> {

    const token = localStorage.getItem("token");

    const response = await api.get<User[]>(("/users"), {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((user => ({
        ...user,
        createdAt: new Date(user.createdAt)
    })));
}