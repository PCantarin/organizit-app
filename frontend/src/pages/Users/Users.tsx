import { Box, Divider } from "@mui/material";
import { getUsers, type User } from "../../services/userService";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import PageTitle from "../../components/PageTitle";

function Users() {
  const [rows, setRows] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setRows(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      flex: 1,
      headerName: "ID",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      flex: 3,
      headerName: "Name",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "username",
      flex: 2,
      headerName: "Usuário",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "role",
      flex: 1,
      headerName: "Nível de permissão",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "createdAt",
      flex: 2,
      headerName: "Criado em:",
      width: 200,
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
      <PageTitle text="Usuários" />

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

export default Users;
