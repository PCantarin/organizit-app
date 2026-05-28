import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { createProduct, getProducts } from "../../services/productService.ts";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import type {
  CreateProductDTO,
  Product,
} from "../../services/productService.ts";
import SearchInput from "../../components/SearchInput.tsx";
import PageTitle from "../../components/PageTitle.tsx";
import PageDivider from "../../components/PageDivider.tsx";
import ModalHeader from "../../components/ModalHeader.tsx";

function Products() {
  const [productList, setProductList] = useState<Product[]>([]);

  //fetching product data here
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProductList(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  const [filterText, setFilterText] = useState("");
  const [open, setOpen] = useState(false);

  const handleFilterChange = (value: string) => {
    setFilterText(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addNewProduct = async (event: React.SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const product: CreateProductDTO = {
      name: data.name as string,
      description: data.description as string,
      quantity: Number(data.quantity),
    };

    const created = await createProduct(product);
    setProductList((prev) => [...prev, created]);

    setOpen(false);
  };

  const filteredValues = productList.filter(
    (product) =>
      product.id.toString().includes(filterText) ||
      product.name.toLowerCase().includes(filterText.toLowerCase()) ||
      product.description.toLowerCase().includes(filterText.toLowerCase()),
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "top",
          gap: 2,
        }}
      >
        <SearchInput value={filterText} onChange={handleFilterChange} />

        <Button
          onClick={handleClickOpen}
          variant="contained"
          sx={{
            backgroundColor: "#7e57c2",
            borderRadius: "8px",
            textTransform: "none",
            fontFamily: "inherit",
            fontWeight: 700,
            fontSize: 16,
            height: 40,
            "&:hover": {
              backgroundColor: "#6a46b0",
            },
          }}
        >
          Novo produto
        </Button>
      </Box>

      <Paper sx={{ maxHeight: 750, width: "100%" }}>
        <DataGrid
          rows={filteredValues}
          columns={columns}
          initialState={{
            pagination: { paginationModel },
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

      <Dialog onClose={handleClose} open={open}>
        <ModalHeader
          text="Salvar novo produto"
          icon={AddCircleOutlineRoundedIcon}
        />
        <DialogContent>
          <form onSubmit={addNewProduct}>
            <TextField
              autoFocus
              required
              name="name"
              label="Nome"
              fullWidth
              variant="standard"
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#7b1fa2",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#7b1fa2",
                },
                mt: "20px",
              }}
            />

            <TextField
              required
              name="description"
              label="Descrição"
              fullWidth
              variant="standard"
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#7b1fa2",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#7b1fa2",
                },
                mt: "20px",
              }}
            />

            <TextField
              required
              name="quantity"
              label="Quantidade inicial"
              type="number"
              fullWidth
              variant="standard"
              slotProps={{
                htmlInput: { min: 0 },
              }}
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#7b1fa2",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#7b1fa2",
                },
                mt: "20px",
              }}
            />

            <Divider sx={{ mt: 1 }} />
            <DialogActions>
              <Button
                autoFocus
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#7e57c2",
                  borderRadius: "6px",
                  textTransform: "none",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: 16,
                  "&:hover": {
                    backgroundColor: "#6a46b0",
                  },
                }}
              >
                Cadastrar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Products;
