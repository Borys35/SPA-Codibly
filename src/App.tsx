import { Box, Button, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useQuery } from "react-query";
import Error from "./components/Error";
import Loading from "./components/Loading";
import { getProducts, PAGE_SIZE, ResponseType } from "./lib/api";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "year",
    headerName: "Year",
    width: 150,
  },
];

const rows = [
  {
    id: 1,
    name: "cerulean",
    year: 2000,
    color: "#98B2D1",
    pantone_value: "15-4020",
  },
  {
    id: 2,
    name: "fuchsia rose",
    year: 2001,
    color: "#C74375",
    pantone_value: "17-2031",
  },
  {
    id: 3,
    name: "true red",
    year: 2002,
    color: "#BF1932",
    pantone_value: "19-1664",
  },
  {
    id: 4,
    name: "aqua sky",
    year: 2003,
    color: "#7BC4C4",
    pantone_value: "14-4811",
  },
  {
    id: 5,
    name: "tigerlily",
    year: 2004,
    color: "#E2583E",
    pantone_value: "17-1456",
  },
  {
    id: 6,
    name: "blue turquoise",
    year: 2005,
    color: "#53B0AE",
    pantone_value: "15-5217",
  },
];

function App() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, refetch } = useQuery<ResponseType>(
    ["products", page],
    async () => await getProducts(page),
    { keepPreviousData: true }
  );

  console.log(data);

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
              <DataGrid
                columns={columns}
                rows={data.data}
                pageSize={PAGE_SIZE}
                rowsPerPageOptions={[PAGE_SIZE]}
                rowCount={data.total}
                onPageChange={(newPage) => setPage(newPage + 1)}
                page={page - 1}
                onCellClick={() => {}}
                paginationMode="server"
              />
            </Box>
          ) : (
            <Error />
          )
        ) : (
          <Loading />
        )}
      </Box>
    </div>
  );
}

export default App;
