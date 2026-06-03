import { Box, IconButton, Stack } from "@mui/material";
import { getUsers, type User } from "../../services/userService";
import type { GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import PageDivider from "../../components/PageDivider";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SearchInput from "../../components/Inputs/SearchInput";
import CustomDataGrid from "../../components/DataGrid/CustomDataGrid";
import AlertModal from "../../components/MessageModal/AlertModal";
import ModeRoundedIcon from "@mui/icons-material/ModeRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FullWidthBox from "../../components/Containers/FullWidthBox";
import HeaderButton from "../../components/Buttons/HeaderButton";
import ModalNewUser from "./Modals/ModalNewUser";

function Users() {
  const [userList, setUserList] = useState<User[]>([]);
  const [filterText, setFilterText] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openNewUser, setOpenNewUser] = useState(false);
  const [openDeactivateAlert, setOpenDeactivateAlert] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setUserList(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  const handleDeactivateUser = () => {
    //TODO: create an endpoint to deactivate user
  }

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
      headerName: "Nível de acesso",
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
        return new Intl.DateTimeFormat("pt-BR").format(new Date(value));
      },
    },
    {
      field: "actions",
      headerName: "",
      minWidth: 100,
      flex: 1,
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
            <IconButton
              onClick={() => {
                setSelectedUser(params.row);
              }}
            >
              <ModeRoundedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setSelectedUser(params.row);
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

  const filteredValue = userList.filter(
    (user) =>
      user.id.toString().includes(filterText) ||
      user.name.toLowerCase().includes(filterText.toLowerCase()) ||
      user.username.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <Box>
      <PageTitle text="Administrar usuários" icon={PersonRoundedIcon} />
      <PageDivider />

      <FullWidthBox>
        <SearchInput value={filterText} onChange={setFilterText} />
        <HeaderButton text="Add. Usuário" onClick={() => setOpenNewUser(true)} />
      </FullWidthBox>

      <CustomDataGrid columns={columns} rows={filteredValue} />

      <ModalNewUser open={openNewUser} onClose={() => setOpenNewUser(false)} onSubmit={() => {}} />

      <AlertModal
        text="Deseja realmente desativar o usuário?"
        open={openDeactivateAlert}
        onCancel={() => setOpenDeactivateAlert(false)}
        onConfirm={handleDeactivateUser}
      />
    </Box>
  );
}

export default Users;
