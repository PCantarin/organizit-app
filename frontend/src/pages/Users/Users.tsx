import { Box, Divider } from "@mui/material";
import { getUsers, type User } from "../../services/userService";
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from "react";

function Users() {

    const [rows, setRows] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await getUsers();
                setRows(data)
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchUsers();
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70, align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'Name', width: 200, align: 'center', headerAlign: 'center' },
        { field: 'username', headerName: 'Usuário', width: 200, align: 'center', headerAlign: 'center' },
        { field: 'role', headerName: 'Nível de permissão', width: 200, align: 'center', headerAlign: 'center' },
        {
            field: 'createdAt', headerName: 'Criado em:', width: 200, align: 'center', headerAlign: 'center', valueFormatter: (value => {
                if (!value) return "";
                else return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
            })
        }
    ];


    const paginationModel = { page: 0, pageSize: 10 };

    return (
        <Box>
            <h1>Usuários</h1>

            <Divider sx={{ marginBottom: '20px', border: 'solid 1px', borderRadius: '10px' }} />

            <Paper sx={{ maxHeight: 750, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[10]}
                    sx={{ border: 0 }}
                />
            </Paper>
        </Box>
    )

}

export default Users;