import React, { useEffect, useState } from "react";

import {
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import ModeRoundedIcon from "@mui/icons-material/ModeRounded";

import type { Product, ProductDTO } from "../../services/productService.ts";

import {
  addProduct,
  createProduct,
  deactivateProductById,
  editProduct,
  getProducts,
  removeProduct,
} from "../../services/productService.ts";
import { errorMessage, successMessage } from "../../services/messageService.ts";

import ControlButton from "../../components/Buttons/ControlButton.tsx";
import HeaderButton from "../../components/Buttons/HeaderButton.tsx";
import SearchInput from "../../components/Inputs/SearchInput.tsx";
import AlertModal from "../../components/MessageModal/AlertModal.tsx";
import PageDivider from "../../components/PageDivider.tsx";
import PageTitle from "../../components/PageTitle.tsx";
import ModalEditProduct from "./Modals/ModalEditProduct.tsx";
import ModalAddProduct from "./Modals/ModalAddProduct.tsx";
import ModalRemoveProduct from "./Modals/ModalRemoveProduct.tsx";
import ModalNewProduct from "./Modals/ModalNewProduct.tsx";

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
      errorMessage("A quantidade a ser adicionada precisa ser maior do que 0.");
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
    } catch {
      errorMessage("Ocorreu um erro ao deletar o produto.");
    }
  };

  const handleEditProduct = async (event: React.SubmitEvent) => {
    event.preventDefault();

    if (!selectedProduct) return;

    try {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());

      if (
        data.name.toString().trim() === "" &&
        data.description.toString().trim() === ""
      ) {
        errorMessage("Preencha ao menos um dos campos para edição!");
        return;
      }

      const productEdit: ProductDTO = {
        name: data.name as string,
        description: data.description as string,
      };

      const editted = await editProduct(selectedProduct.id, productEdit);
      setProductList((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id ? editted : product,
        ),
      );

      setOpenEditProduct(false);
      successMessage("Produto editado com sucesso!");
    } catch {
      errorMessage("Ocorreu um erro ao editar o produto.");
    }
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
            <IconButton
              onClick={() => {
                setSelectedProduct(params.row);
                setOpenEditProduct(true);
              }}
            >
              <ModeRoundedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setSelectedProduct(params.row);
                setOpenDeactivateAlert(true);
              }}
            >
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
        <SearchInput value={filterText} onChange={setFilterText} />
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

      <ModalNewProduct
        onClose={handleCloseNewProduct}
        open={openNewProduct}
        onSubmit={addNewProduct}
      />

      <ModalRemoveProduct
        onClose={handleCloseRemoveProduct}
        open={openRemoveProduct}
        onSubmit={handleRemoveProduct}
      />

      <ModalAddProduct
        onClose={handleCloseAddProduct}
        open={openAddProduct}
        onSubmit={handleAddProduct}
      />

      <ModalEditProduct
        onClose={handleCloseEditProduct}
        open={openEditProduct}
        selectedProduct={selectedProduct}
        onSubmit={handleEditProduct}
      />

      <AlertModal
        text="Deseja realmente excluir o produto?"
        open={openDeactivateAlert}
        onCancel={() => {setOpenDeactivateAlert(false)}}
        onConfirm={handleDeactivateProduct}
      />
    </Box>
  );
}

export default Products;