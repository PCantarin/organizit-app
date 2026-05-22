import api from "./api";

export async function login(login: string, password: string) {

    const response = await api.post("/auth/login", {
        login,
        password
    })

    return response.data;
}