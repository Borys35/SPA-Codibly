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
  TextField,
  Typography,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useState } from "react";
import { useQuery } from "react-query";
import Error from "./components/Error";
import Loading from "./components/Loading";
import { getProducts, PAGE_SIZE, ResponseType } from "./lib/api";

function App() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, refetch } = useQuery<ResponseType>(
    ["products", page],
    async () => await getProducts(page),
    { keepPreviousData: true }
  );

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
              <Box display="flex">
                <TextField inputProps={{ inputMode: "decimal" }} size="small" />
                <Button variant="contained">Find</Button>
              </Box>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Year</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.data.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          backgroundColor: row.color,
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="right">{row.year}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5]}
                        colSpan={3}
                        count={data.total}
                        rowsPerPage={PAGE_SIZE}
                        page={page - 1}
                        onPageChange={(e, newPage) => setPage(newPage + 1)}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Error error={error} onRefetchClick={() => refetch()} />
          )
        ) : (
          <Loading />
        )}
      </Box>
    </div>
  );
}

export default App;
