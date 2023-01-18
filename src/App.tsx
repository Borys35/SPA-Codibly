import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useEffect } from "react";
import FilterForm from "./components/FilterForm";
import Loading from "./components/Loading";
import ProductDialog from "./components/ProductDialog";
import ProductTableRow from "./components/table/ProductTableRow";
import { useAppDispatch, useAppSelector } from "./redux/hooks/useAppDispatch";
import {
  fetchGetProductById,
  fetchGetProducts,
  isArray,
  isSingle,
  PAGE_SIZE,
  selectProduct,
  unselectProduct,
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

    id ? dispatch(fetchGetProductById(id)) : dispatch(fetchGetProducts(p));
    s && dispatch(selectProduct(s));
  }, []);

  function handleDialogClose() {
    dispatch(unselectProduct());
  }

  async function handleFilterSubmit(id: number) {
    dispatch(fetchGetProductById(id));
  }

  return (
    <div className="App">
      {!("data" in products.response) ? (
        <Loading />
      ) : (
        <Box
          alignItems="center"
          flexDirection="column"
          display="flex"
          gap={4}
          p={2}
        >
          <Typography variant="h1">Codibly SPA</Typography>
          {
            <Box sx={{ height: 400, width: "100%" }}>
              <FilterForm onSubmit={handleFilterSubmit} />
              {isSingle(products.response) && (
                <Button
                  onClick={async () => {
                    dispatch(fetchGetProducts(1));
                  }}
                  color="warning"
                  variant="outlined"
                >
                  Clear
                </Button>
              )}
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="Main table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Year</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isArray(products.response)
                      ? products.response.data.map((row, i) => (
                          <ProductTableRow key={row.id} i={i} product={row} />
                        ))
                      : isSingle(products.response) && (
                          <ProductTableRow
                            i={0}
                            product={products.response.data}
                          />
                        )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[PAGE_SIZE]}
                        colSpan={3}
                        count={
                          isArray(products.response)
                            ? products.response.total
                            : 1
                        }
                        rowsPerPage={PAGE_SIZE}
                        page={
                          isArray(products.response)
                            ? products.page
                              ? products.page - 1
                              : 0
                            : 0
                        }
                        onPageChange={(e, newPage) => {
                          dispatch(fetchGetProducts(newPage + 1));
                        }}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
              {products.selectedProductIndex !== undefined && (
                <ProductDialog
                  open={products.selectedProductIndex !== undefined}
                  onClose={handleDialogClose}
                  product={
                    isArray(products.response)
                      ? products.response.data[products.selectedProductIndex]
                      : isSingle(products.response)
                      ? products.response.data
                      : undefined
                  }
                />
              )}
            </Box>
          }
        </Box>
      )}
    </div>
  );
}

export default App;
