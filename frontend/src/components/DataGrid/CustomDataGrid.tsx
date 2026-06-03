import { Paper } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";


type CustomDataGridProps = {
    rows: object[];
    columns: GridColDef[];
    maxPerPage?: number;
}

function CustomDataGrid({rows, columns, maxPerPage = 10 }: CustomDataGridProps){

    const paginationModel = { page: 0, pageSize: maxPerPage }

    return(
        <Paper sx={{ maxHeight: 750, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel },
          }}
          pageSizeOptions={[10]}
          rowSelection={false}
          localeText={{ noRowsLabel: "Nenhum valor encontrado." }}
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
    );

}

export default CustomDataGrid;