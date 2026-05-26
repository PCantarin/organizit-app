import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';

function Layout() {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);

    const auth = !!localStorage.getItem("token")

    React.useEffect(() => {
        if (!auth) {
            navigate("/")
        }
    }, [auth, navigate]);


    const drawerWidth = 240;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="relative" elevation={1} sx={{ backgroundColor: "#6d28d9", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
                    <img style={{height: '35px'}} src="/src/assets/img/organizit_horizontal_logo.png"></img>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: "#8b5cf6"
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <Toolbar />

                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/home")} sx={{
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#8240f4",
                        },
                    }}>
                        <ListItemIcon sx={{ color: "white" }}>
                            <HomeRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Principal" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/products")} sx={{
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#8240f4",
                        },
                    }}>
                        <ListItemIcon sx={{ color: "white" }}>
                            <Inventory2RoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Produtos" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/users")} sx={{
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#8240f4",
                        },
                    }}>
                        <ListItemIcon sx={{ color: "white" }}>
                            <PersonRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Usuários" />
                    </ListItemButton>
                </ListItem>

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