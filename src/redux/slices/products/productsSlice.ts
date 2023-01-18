import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProductById, getProducts } from "../../../lib/api";
import {
  setId,
  setPage,
  setSelectedProduct,
  unsetSelectedProduct,
} from "../../../lib/url";

export const PAGE_SIZE = 5;

export interface ProductType {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface ArrayResponseType {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ProductType[];
}

export interface SingleResponseType {
  data: ProductType;
}

export type ResponseType = ArrayResponseType | SingleResponseType | {};

type State = {
  response: ResponseType;
  page?: number;
  id?: number;
  error?: unknown;
  selectedProductIndex?: number;
};

const initialState: State = {
  response: {},
};

export function isArray(response: ResponseType): response is ArrayResponseType {
  return "total" in response;
}

export function isSingle(
  response: ResponseType
): response is SingleResponseType {
  return !("total" in response);
}

export const fetchGetProducts = createAsyncThunk(
  "products/getProducts",
  async (page: number = 1, thunkAPI) => {
    try {
      setPage(page);
      const response = await getProducts(page);
      thunkAPI.dispatch(changePage(page));
      return response;
    } catch (e) {
      thunkAPI.dispatch(setError(JSON.stringify(e)));
    }
  }
);

export const fetchGetProductById = createAsyncThunk(
  "products/getProductById",
  async (id: number, thunkAPI) => {
    try {
      setId(id);
      const response = await getProductById(id);
      thunkAPI.dispatch(setFilterId(id));
      return response;
    } catch (e) {
      thunkAPI.dispatch(setError(JSON.stringify(e)));
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFilterId(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    selectProduct(state, action: PayloadAction<number>) {
      state.selectedProductIndex = action.payload;
      setSelectedProduct(action.payload);
    },
    unselectProduct(state) {
      state.selectedProductIndex = undefined;
      unsetSelectedProduct();
    },
    setError(state, action: PayloadAction<unknown>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetProducts.fulfilled, (state, action) => {
        if (!action.payload) return;

        state.response = action.payload;
        state.id = undefined;
      })
      .addCase(fetchGetProductById.fulfilled, (state, action) => {
        if (!action.payload) return;

        state.response = action.payload;
        state.id = action.payload.data.id;
      });
  },
});

export const {
  changePage,
  selectProduct,
  unselectProduct,
  setFilterId,
  setError,
  clearError,
} = productsSlice.actions;

export default productsSlice.reducer;
