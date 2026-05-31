import api from "./api";

export type Product = {
  id: number;
  name: string;
  assetNumber: number;
  description: string;
  dateInsert: Date;
  quantity: number;
};

export type ProductDTO = {
    name: string,
    description: string,
    quantity?: number
}

export async function getProducts(): Promise<Product[]> {
  const response = await api.get<Product[]>("/products");
  return response.data.map((product) => ({
    ...product,
    dateInsert: new Date(product.dateInsert),
  }));
}

export async function createProduct(product: ProductDTO) {
  const response = await api.post("/products", product);
  return response.data;
}

export async function removeProduct(id: number, quantity:number) {
  const response = await api.patch(`/products/${id}/remove/${quantity}`)
  return response.data;
}

export async function addProduct(id: number, quantity:number) {
  const response = await api.patch(`/products/${id}/add/${quantity}`)
  return response.data;
}

export async function deactivateProductById(product: Product) {
  const response = await api.patch(`/products/${product.id}/deactivate`)
  return response.data;
}

export async function editProduct(id: number, product: ProductDTO) {
  const response = await api.patch(`/products/${id}`, product);
  return response.data;
}