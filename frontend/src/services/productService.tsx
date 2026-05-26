import api from "./api";


export type Product = {
    id: number;
    name: string;
    assetNumber: number;
    description: string;
    dateInsert: Date;
    quantity: number;
}

export async function getProducts(): Promise<Product[]>{
    
    const token = localStorage.getItem("token");

    const response = await api.get<Product[]>(("/products"), {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.map((product => ({
        ...product,
        dateInsert: new Date(product.dateInsert)
    })));
}