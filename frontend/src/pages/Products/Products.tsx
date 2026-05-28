import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
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
import SearchInput from "../../components/Inputs/SearchInput.tsx";
import PageTitle from "../../components/PageTitle.tsx";
import PageDivider from "../../components/PageDivider.tsx";
import ModalHeader from "../../components/ModalHeader.tsx";
import SimpleButton from "../../components/Buttons/SimpleButton.tsx";
import HeaderButton from "../../components/Buttons/HeaderButton.tsx";
import FormTextField from "../../components/Inputs/FormTextField.tsx";
import FormNumberField from "../../components/Inputs/FormNumberField.tsx";
import RemoveButton from "../../components/Buttons/ControlButton.tsx";
import ControlButton from "../../components/Buttons/ControlButton.tsx";

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
      flex: 3,
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
    {
      field: "actions",
      headerName: "Ações",
      flex: 2,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1} sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <ControlButton text="REM" type="remove" />
            <ControlButton text="ADD" type="add" />
          </Stack>
        );
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

        <HeaderButton text="Novo Produto" onClick={handleClickOpen} />
      </Box>

      <Paper sx={{ maxHeight: 750, width: "100%" }}>
        <DataGrid
          rows={filteredValues}
          columns={columns}
          initialState={{
            pagination: { paginationModel },
          }}
          pageSizeOptions={[10]}
          rowSelection={false}
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

            <FormTextField name="name" label="Nome" required={true} />
            <FormTextField name="description" label="Descrição" required={true} />
            <FormNumberField name="quantity" label="Quantidade inicial" defaultValue={0} required={true} />

            <Divider sx={{ mt: 1 }} />
            <DialogActions>
              <SimpleButton type="submit" text="Cadastrar" />
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Products;
