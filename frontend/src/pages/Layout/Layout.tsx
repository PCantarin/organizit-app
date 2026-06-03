import * as React from "react";
import { AccountCircle } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import { Toaster } from "react-hot-toast";
import DefaultListItem from "../../components/Drawer/DefaultListItem";
import DrawerDivider from "../../components/Drawer/DrawerDivider";

function Layout() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = !!localStorage.getItem("token");

  React.useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  const drawerWidth = 240;

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toaster position="bottom-left" reverseOrder={false} />
      <AppBar
        position="relative"
        elevation={1}
        sx={{
          backgroundColor: "#6d28d9",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(!open)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img
            style={{ height: "35px" }}
            src="/src/assets/img/organizit_horizontal_logo.png"
          ></img>

          <Box sx={{ flexGrow: 1 }} />

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>
                <LogoutRoundedIcon />
                Sair
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#8b5cf6",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />

        <DefaultListItem
          text="Principal"
          onClick={() => navigate("/home")}
          icon={HomeRoundedIcon}
        />

        <DrawerDivider text="Produtos" />

        <DefaultListItem
          text="Produtos"
          onClick={() => navigate("/products")}
          icon={Inventory2RoundedIcon}
        />

        <DefaultListItem
          text="Movimentações"
          onClick={() => navigate("/movements")}
          icon={HistoryRoundedIcon}
        />

        <DrawerDivider text="Admin. Usuários" />

        <DefaultListItem
          text="Usuários"
          onClick={() => navigate("/users")}
          icon={PeopleAltRoundedIcon}
        />
      </Drawer>
      <Box
        sx={{
          p: "30px",
          transition: "margin 0.3s ease",
          marginLeft: open ? `${drawerWidth}px` : 0,
          height: "90vh",
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
