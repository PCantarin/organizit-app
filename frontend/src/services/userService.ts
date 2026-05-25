import api from "./api";

export async function getUsers() {

    const token = localStorage.getItem("token");
    
    console.log(token)

    const response = await api.get(("/users"), {
        headers: {
            Authorization: `Bearer: ${token}`
        }
    })

    return response.data;
}