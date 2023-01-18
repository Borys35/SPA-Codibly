import {
  ArrayResponseType,
  PAGE_SIZE,
  SingleResponseType,
} from "../redux/slices/products/productsSlice";

export async function getProducts(page = 1) {
  const res = await fetch(
    `https://reqres.in/api/products?per_page=${PAGE_SIZE}&page=${page}`
  );
  if (!res.ok) throw new Error(res.status.toString());
  const data = await res.json();
  return data as ArrayResponseType;
}

export async function getProductById(id: number) {
  const res = await fetch(`https://reqres.in/api/products?id=${id}`);
  if (!res.ok) throw new Error(res.status.toString());
  const data = await res.json();
  return data as SingleResponseType;
}
