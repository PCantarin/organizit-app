import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService.ts";
import type { Product } from "../../services/productService.ts";
import SearchInput from "../../components/SearchInput.tsx";
import PageTitle from "../../components/PageTitle.tsx";
import PageDivider from "../../components/PageDivider.tsx";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  
  //fetching product data here
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);
  

  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (value: string) => {
    setFilterText(value);
  };

  const filteredValues = products.filter(product => 
    product.id.toString().includes(filterText) ||
    product.name.toLowerCase().includes(filterText.toLowerCase()) ||
    product.description.toLowerCase().includes(filterText.toLowerCase())
  );

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
      field: "description",
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
    <Box>
      <PageTitle text="Produtos" />

      <PageDivider />

      <SearchInput value={filterText} onChange={handleFilterChange} />

      <Paper sx={{ maxHeight: 750, width: "100%" }}>
        <DataGrid
          rows={filteredValues}
          columns={columns}
          initialState={{
            pagination: { paginationModel }
          }}
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
