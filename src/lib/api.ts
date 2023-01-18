import {
  ArrayResponseType,
  PAGE_SIZE,
  SingleResponseType,
} from "../redux/slices/products/productsSlice";

export async function getProducts(page = 1) {
  try {
    const res = await fetch(
      `https://reqres.in/api/products?per_page=${PAGE_SIZE}&page=${page}`
    );
    const data = await res.json();
    return data as ArrayResponseType;
  } catch (e) {
    throw e;
  }
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
