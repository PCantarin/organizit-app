import { Box, Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

function Products() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Produto", width: 250 },
    { field: "desc", headerName: "Descrição", width: 350 },
    { field: "quantity", headerName: "Quantidade Disponível", width: 200, align: 'center', headerAlign: 'center' },
    { field: "dateInsert", headerName: "Data de Cadastro", width: 200, align: 'center', headerAlign: 'center' },
  ];

  const rows = [
    {
      id: 1,
      name: "Cabo Ethernet Cat5e",
      desc: "Cabo de 5 metros de comprimento",
      quantity: "32",
      dateInsert: "12-01-2026",
    },
    {
      id: 2,
      name: "Mouse Gamer RGB",
      desc: "Mouse óptico com 7200 DPI",
      quantity: "15",
      dateInsert: "13-01-2026",
    },
    {
      id: 3,
      name: "Teclado Mecânico",
      desc: "Switch blue ABNT2",
      quantity: "9",
      dateInsert: "13-01-2026",
    },
    {
      id: 4,
      name: "Monitor 24 Polegadas",
      desc: "Monitor Full HD IPS",
      quantity: "7",
      dateInsert: "14-01-2026",
    },
    {
      id: 5,
      name: "SSD 1TB",
      desc: "Armazenamento NVMe Gen4",
      quantity: "18",
      dateInsert: "15-01-2026",
    },
    {
      id: 6,
      name: "Memória RAM 16GB",
      desc: "DDR4 3200MHz",
      quantity: "25",
      dateInsert: "15-01-2026",
    },
    {
      id: 7,
      name: "Headset Bluetooth",
      desc: "Cancelamento de ruído ativo",
      quantity: "11",
      dateInsert: "16-01-2026",
    },
    {
      id: 8,
      name: "Webcam Full HD",
      desc: "Resolução 1080p com microfone",
      quantity: "14",
      dateInsert: "16-01-2026",
    },
    {
      id: 9,
      name: "Fonte 650W",
      desc: "Fonte modular 80 Plus Bronze",
      quantity: "6",
      dateInsert: "17-01-2026",
    },
    {
      id: 10,
      name: "Notebook Dell Inspiron",
      desc: "Intel i5 com 8GB RAM",
      quantity: "4",
      dateInsert: "18-01-2026",
    },
    {
      id: 11,
      name: "Hub USB 3.0",
      desc: "Expansor com 4 portas USB",
      quantity: "20",
      dateInsert: "18-01-2026",
    },
    {
      id: 12,
      name: "Roteador Wi-Fi 6",
      desc: "Dual Band alta velocidade",
      quantity: "10",
      dateInsert: "19-01-2026",
    },
    {
      id: 13,
      name: "Adaptador HDMI",
      desc: "Conversor HDMI para VGA",
      quantity: "27",
      dateInsert: "19-01-2026",
    },
    {
      id: 14,
      name: "Cooler Fan 120mm",
      desc: "Ventoinha silenciosa RGB",
      quantity: "35",
      dateInsert: "20-01-2026",
    },
    {
      id: 15,
      name: "Placa de Vídeo RTX 4060",
      desc: "8GB GDDR6",
      quantity: "3",
      dateInsert: "20-01-2026",
    },
    {
      id: 16,
      name: "Cadeira Gamer",
      desc: "Encosto reclinável ergonômico",
      quantity: "5",
      dateInsert: "21-01-2026",
    },
    {
      id: 17,
      name: "Impressora Multifuncional",
      desc: "Impressão colorida Wi-Fi",
      quantity: "8",
      dateInsert: "22-01-2026",
    },
    {
      id: 18,
      name: "Switch 8 Portas",
      desc: "Switch gigabit gerenciável",
      quantity: "12",
      dateInsert: "22-01-2026",
    },
    {
      id: 19,
      name: "Pendrive 64GB",
      desc: "USB 3.2 alta velocidade",
      quantity: "40",
      dateInsert: "23-01-2026",
    },
    {
      id: 20,
      name: "Suporte para Monitor",
      desc: "Base articulada ajustável",
      quantity: "13",
      dateInsert: "24-01-2026",
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Box
      sx={{
        height: "90vh",
      }}
    >
      <h1>Produtos</h1>

      <Divider sx={{marginBottom: '20px', border: 'solid 1px', borderRadius: '10px'}} />

      <Paper sx={{ maxHeight: 750, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
}

export default Products;
