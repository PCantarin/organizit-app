import { Box } from "@mui/material";
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';

function Home() {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'Name', width: 130 }
    ]

    const rows = [
        { id: 1, firstName: 'Jon' },
        { id: 2, firstName: 'Cersei' },
        { id: 3, firstName: 'Jaime' },
        { id: 4, firstName: 'Arya' },
        { id: 5, firstName: 'Daenerys' },
        { id: 6, firstName: null },
        { id: 7, firstName: 'Ferrara' },
        { id: 8, firstName: 'Rossini' },
        { id: 9, firstName: 'Harvey' },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <Box sx={{
            height: "90vh",
        }}>
            <h1>Bem-vindo!</h1>

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

export default Home;