import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import Error from "./components/Error";
import Loading from "./components/Loading";
import ProductTable from "./components/table/ProductTable";
import { useAppDispatch, useAppSelector } from "./redux/hooks/useAppDispatch";
import {
  fetchGetProductById,
  fetchGetProducts,
  selectProduct,
} from "./redux/slices/products/productsSlice";

function App() {
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const p = searchParams.has("page")
      ? parseInt(searchParams.get("page")!)
      : 1;
    const id = searchParams.has("id")
      ? parseInt(searchParams.get("id")!)
      : undefined;
    const s = searchParams.has("selected")
      ? parseInt(searchParams.get("selected")!)
      : undefined;

    id !== undefined
      ? dispatch(fetchGetProductById(id))
      : dispatch(fetchGetProducts(p));
    s !== undefined && dispatch(selectProduct(s));
  }, []);

  return (
    <div className="App">
      <Box
        alignItems="center"
        flexDirection="column"
        display="flex"
        gap={4}
        p={2}
      >
        <Typography variant="h1">Codibly SPA</Typography>
        {products.error ? (
          <Error
            error={products.error}
            onRefetchClick={() => {
              window.location.reload();
            }}
          />
        ) : !("data" in products.response) ? (
          <Loading />
        ) : (
          <ProductTable />
        )}
      </Box>
    </div>
  );
}

export default App;
