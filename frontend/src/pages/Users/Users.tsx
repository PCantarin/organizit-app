import { Box } from "@mui/material";
import { getUsers } from "../../services/userService";
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from "react";

function Users() {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await getUsers();

                const formattedRows = data.map((element: any) => ({
                    id: element.id,
                    name: element.name,
                    username: element.username,
                    role: element.role,
                    createdAt: element.createdAt
                }));

                setRows(formattedRows)
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchUsers();
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'username', headerName: 'Usuário', width: 130 },
        { field: 'role', headerName: 'Nível de permissão', width: 130 },
        { field: 'createdAt', headerName: 'Criado em:', width: 130 }
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <Box>
            <h1>Usuários</h1>

            <Paper sx={{ maxHeight: 750, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
            </Paper>
        </Box>
    )

}

export default Users;