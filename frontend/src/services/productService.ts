import api from "./api";

export type Product = {
  id: number;
  name: string;
  assetNumber: number;
  description: string;
  dateInsert: Date;
  quantity: number;
};

export type CreateProductDTO = {
    name: string,
    description: string,
    quantity: number
}

export async function getProducts(): Promise<Product[]> {

  const response = await api.get<Product[]>("/products");

  return response.data.map((product) => ({
    ...product,
    dateInsert: new Date(product.dateInsert),
  }));
}

export async function createProduct(product: CreateProductDTO) {

  const response = await api.post("/products", product);

  return response.data;
}
