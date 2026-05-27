import { Box, Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService.ts";
import type { Product } from "../../services/productService.ts";

function Products() {
  const [rows, setRows] = useState<Product[]>();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setRows(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      minWidth: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Produto",
      flex: 3,
      minWidth: 250,
      headerAlign: "center",
    },
    {
      field: "desc",
      headerName: "Descrição",
      flex: 6,
      minWidth: 350,
      headerAlign: "center",
    },
    {
      field: "quantity",
      headerName: "Quantidade Disponível",
      flex: 2,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "dateInsert",
      headerName: "Data de Cadastro",
      flex: 3,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      valueFormatter: (value) => {
        if (!value) return "";
        else return new Intl.DateTimeFormat("pt-BR").format(new Date(value));
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Box
      sx={{
        height: "90vh",
      }}
    >
      <h1>Produtos</h1>

      <Divider
        sx={{ marginBottom: "20px", border: "solid 1px", borderRadius: "10px" }}
      />

      <Paper sx={{ maxHeight: 750, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10]}
          sx={{
            border: 0,
            borderRadius: "10px",
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#ebebeb",
              fontSize: 16,
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Paper>
    </Box>
  );
}

export default Products;
