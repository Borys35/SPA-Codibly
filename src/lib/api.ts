export const PAGE_SIZE = 5;

export interface ProductType {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface ResponseType {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ProductType[];
}

export interface SingleResponseType {
  data: ProductType;
}

export async function getProducts(page = 1) {
  const res = await fetch(
    `https://reqres.in/api/products?per_page=${PAGE_SIZE}&page=${page}`
  );
  const data = await res.json();
  return data as ResponseType;
}

export async function getProductById(id: number) {
  try {
    const res = await fetch(`https://reqres.in/api/products?id=${id}`);
    const data = await res.json();
    return data as SingleResponseType;
  } catch (e) {
    throw e;
  }
}
