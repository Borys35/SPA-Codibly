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
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks/useAppDispatch";
import {
  fetchGetProductById,
  fetchGetProducts,
  isArray,
  isSingle,
  PAGE_SIZE,
  unselectProduct,
} from "../../redux/slices/products/productsSlice";
import FilterForm from "../FilterForm";
import ProductDialog from "../ProductDialog";
import ProductTableRow from "./ProductTableRow";

const ProductTable = () => {
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  async function handleFilterSubmit(id: number) {
    dispatch(fetchGetProductById(id));
  }

  function handleDialogClose() {
    dispatch(unselectProduct());
  }

  return (
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
                  <ProductTableRow i={0} product={products.response.data} />
                )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[PAGE_SIZE]}
                colSpan={3}
                count={isArray(products.response) ? products.response.total : 1}
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
  );
};

export default ProductTable;
