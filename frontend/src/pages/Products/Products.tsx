import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import {
  addProduct,
  createProduct,
  deactivateProductById,
  editProduct,
  getProducts,
  removeProduct,
} from "../../services/productService.ts";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import type {
  Product,
  ProductDTO,
} from "../../services/productService.ts";
import SearchInput from "../../components/Inputs/SearchInput.tsx";
import PageTitle from "../../components/PageTitle.tsx";
import PageDivider from "../../components/PageDivider.tsx";
import ModalHeader from "../../components/ModalHeader.tsx";
import SimpleButton from "../../components/Buttons/SimpleButton.tsx";
import HeaderButton from "../../components/Buttons/HeaderButton.tsx";
import FormTextField from "../../components/Inputs/FormTextField.tsx";
import FormNumberField from "../../components/Inputs/FormNumberField.tsx";
import ControlButton from "../../components/Buttons/ControlButton.tsx";
import { errorMessage, successMessage } from "../../services/messageService.ts";
import AlertModal from "../../components/MessageModal/AlertModal.tsx";

function Products() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [filterText, setFilterText] = useState("");
  const [openNewProduct, setOpenNewProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openRemoveProduct, setOpenRemoveProduct] = useState(false);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openDeactivateAlert, setOpenDeactivateAlert] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);

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

  const handleFilterChange = (value: string) => {
    setFilterText(value);
  };

  const handleClickOpen = () => {
    setOpenNewProduct(true);
  };

  const handleCloseNewProduct = () => {
    setOpenNewProduct(false);
  };

  const handleCloseRemoveProduct = () => {
    setOpenRemoveProduct(false);
  };

  const handleCloseAddProduct = () => {
    setOpenAddProduct(false);
  };

  const handleCloseEditProduct = () => {
    setOpenEditProduct(false);
  };

  const addNewProduct = async (event: React.SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const product: ProductDTO = {
      name: data.name as string,
      description: data.description as string,
      quantity: Number(data.quantity),
    };

    try {
      const created = await createProduct(product);
      setProductList((prev) => [...prev, created]);

      setOpenNewProduct(false);
      successMessage(`${data.name} adicionado ao estoque!`);
    } catch {
      errorMessage("Ocorreu um erro ao tentar adicionar o produto!");
    }
  };

  const handleRemoveProduct = async (event: React.SubmitEvent) => {
    event.preventDefault();
    if (!selectedProduct) return;

    const formData = new FormData(event.target);
    const quantity = Number(formData.get("quantity") ?? 0);

    if (quantity === 0) {
      errorMessage("A quantidade precisa ser maior do que zero!");
      return;
    }
    if (quantity > selectedProduct.quantity) {
      errorMessage("Estoque insuficiente!");
      return;
    }

    try {
      await removeProduct(selectedProduct.id, quantity);

      setProductList((products) =>
        products.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, quantity: product.quantity - quantity }
            : product,
        ),
      );

      setOpenRemoveProduct(false);
      successMessage("Retirada efetuada com sucesso!");
    } catch {
      errorMessage("Ocorreu um erro ao remover o produto.");
    }
  };

  const handleAddProduct = async (event: React.SubmitEvent) => {
    event.preventDefault();
    if (!selectedProduct) return;

    const formData = new FormData(event.target);
    const quantity = Number(formData.get("quantity") ?? 0);

    if (quantity <= 0) {
      errorMessage("A quantidade a ser adicionada precisa ser maior do que 0.")
      return;
    }

    try {
      await addProduct(selectedProduct.id, quantity);

      setProductList((products) =>
        products.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, quantity: product.quantity + quantity }
            : product,
        ),
      );

      setOpenAddProduct(false);
      successMessage(
        `Adicionado ${quantity} ao produto ${selectedProduct.name}`,
      );
    } catch {
      errorMessage("Ocorreu um erro ao efetuar a adição do produto.");
    }
  };

  const handleDeactivateProduct = async () => {

    if (!selectedProduct) return;

    try {
      await deactivateProductById(selectedProduct);

      setProductList((prev) => prev.filter((p) => p.id !== selectedProduct.id));
      setOpenDeactivateAlert(false);
      successMessage("Produto deletado com sucesso.");
    }
    catch {
      errorMessage("Ocorreu um erro ao deletar o produto.")
    }
  }

  const handleEditProduct = async (event: React.SubmitEvent) => {
    event.preventDefault();

    if (!selectedProduct) return;

    try {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());

      if(data.name.toString().trim() === "" && data.description.toString().trim() === ""){
        errorMessage("Preencha ao menos um dos campos para edição!")
        return;
      }

      const productEdit: ProductDTO = {
        name: data.name as string,
        description: data.description as string
      }

      const editted = await editProduct(selectedProduct.id, productEdit);
      setProductList((prev) => prev.map((product) =>
        product.id === selectedProduct.id ? editted : product
      ));

      setOpenEditProduct(false);
      successMessage("Produto editado com sucesso!")
    }
    catch {
      errorMessage("Ocorreu um erro ao editar o produto.")
    }
  }

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
      headerName: "",
      minWidth: 250,
      flex: 2,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ControlButton
              text="REM"
              type="remove"
              onClick={() => {
                setSelectedProduct(params.row);
                setOpenRemoveProduct(true);
              }}
            />
            <ControlButton
              text="ADD"
              type="add"
              onClick={() => {
                setSelectedProduct(params.row);
                setOpenAddProduct(true);
              }}
            />
            <IconButton onClick={() => {
              setSelectedProduct(params.row);
              setOpenEditProduct(true);
            }}>
              <ModeRoundedIcon />
            </IconButton>
            <IconButton onClick={() => {
              setSelectedProduct(params.row);
              setOpenDeactivateAlert(true);
            }}>
              <DeleteRoundedIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Box>
      <PageTitle text="Produtos" icon={Inventory2RoundedIcon} />

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
          localeText={{ noRowsLabel: "Nenhum produto encontrado." }}
          sx={{
            border: 0,
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

      <Dialog onClose={handleCloseNewProduct} open={openNewProduct}>
        <ModalHeader text="Salvar novo produto" icon={AddRoundedIcon} />
        <DialogContent>
          <form onSubmit={addNewProduct}>
            <FormTextField name="name" label="Nome" required={true} />
            <FormTextField
              name="description"
              label="Descrição"
              required={true}
            />
            <FormNumberField
              name="quantity"
              label="Quantidade inicial"
              required={true}
            />

            <Divider sx={{ mt: 1 }} />
            <DialogActions>
              <SimpleButton type="submit" text="Cadastrar" />
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog onClose={handleCloseRemoveProduct} open={openRemoveProduct}>
        <ModalHeader text="Retirar" icon={RemoveCircleOutlineRoundedIcon} />
        <DialogContent>
          <form onSubmit={handleRemoveProduct}>
            <FormNumberField
              name="quantity"
              label="Quantidade"
              required={true}
            />

            <Divider sx={{ mt: 1 }} />
            <DialogActions>
              <SimpleButton type="submit" text="Confirmar" />
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog onClose={handleCloseAddProduct} open={openAddProduct}>
        <ModalHeader text="Inserir" icon={AddCircleOutlineRoundedIcon} />
        <DialogContent>
          <form onSubmit={handleAddProduct}>
            <FormNumberField
              name="quantity"
              label="Quantidade"
              required={true}
            />

            <Divider sx={{ mt: 1 }} />
            <DialogActions>
              <SimpleButton type="submit" text="Confirmar" />
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog onClose={handleCloseEditProduct} open={openEditProduct}>
        <ModalHeader text="Editar" icon={ModeRoundedIcon} />
        <DialogContent>
          <form onSubmit={handleEditProduct}>
            <FormTextField name="name" label="Nome" required={false} />
            <FormTextField
              name="description"
              label="Descrição"
              required={false}
            />

            <Divider sx={{ mt: 1 }} />
            <DialogActions>
              <SimpleButton type="submit" text="Confirmar" />
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <AlertModal
        text="Deseja realmente excluir o produto?"
        open={openDeactivateAlert}
        onCancel={() => { setOpenDeactivateAlert(false) }}
        onConfirm={handleDeactivateProduct}
      />

    </Box>
  );
}

export default Products;
