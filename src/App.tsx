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
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import Error from "./components/Error";
import FilterForm from "./components/FilterForm";
import Loading from "./components/Loading";
import ProductDialog from "./components/ProductDialog";
import {
  getProductById,
  getProducts,
  PAGE_SIZE,
  ResponseType,
  SingleResponseType,
} from "./lib/api";

function App() {
  const [page, setPage] = useState(1);
  const [selectedProductIndex, setSelectedProductIndex] = useState<
    number | null
  >(null);
  const [data, setData] = useState<SingleResponseType | ResponseType>();
  const [error, setError] = useState<unknown>();
  const { isLoading, refetch } = useQuery<ResponseType>(
    ["products", page],
    async () => await getProducts(page),
    {
      keepPreviousData: true,
      onSuccess(data) {
        setData(data);
      },
      onError(err) {
        setError(err);
      },
    }
  );
  const queryClient = useQueryClient();

  function handleDialogClose() {
    setSelectedProductIndex(null);
  }

  async function handleFilterSubmit(id: number) {
    try {
      const data = await queryClient.fetchQuery(
        ["products", { id }],
        async () => await getProductById(id)
      );

      if (!("data" in data)) {
        return setError("Product with given ID is not found.");
      }
      setData(data);
    } catch (e) {
      setError(e);
    }
  }

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
        {!isLoading ? (
          !error && data ? (
            <Box sx={{ height: 400, width: "100%" }}>
              <FilterForm onSubmit={handleFilterSubmit} />
              {!Array.isArray(data.data) && (
                <Button
                  onClick={async () => await refetch()}
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
                    {Array.isArray(data.data) ? (
                      data.data.map((row, i) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            backgroundColor: row.color,
                          }}
                          onClick={() => {
                            setSelectedProductIndex(i);
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell align="right">{row.year}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow
                        key={data.data.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          backgroundColor: data.data.color,
                        }}
                        onClick={() => {
                          setSelectedProductIndex(0);
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {data.data.id}
                        </TableCell>
                        <TableCell>{data.data.name}</TableCell>
                        <TableCell align="right">{data.data.year}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5]}
                        colSpan={3}
                        count={"total" in data ? data.total : 1}
                        rowsPerPage={PAGE_SIZE}
                        page={"total" in data ? page - 1 : 0}
                        onPageChange={(e, newPage) => setPage(newPage + 1)}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
              {selectedProductIndex !== null && (
                <ProductDialog
                  open={selectedProductIndex !== null}
                  onClose={handleDialogClose}
                  product={
                    Array.isArray(data.data)
                      ? data.data[selectedProductIndex]
                      : data.data
                  }
                />
              )}
            </Box>
          ) : (
            <Error
              error={error}
              onRefetchClick={() => {
                setError(undefined);
              }}
            />
          )
        ) : (
          <Loading />
        )}
      </Box>
    </div>
  );
}

export default App;
