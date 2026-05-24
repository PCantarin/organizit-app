import "./Layout.css"
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

function Layout() {

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(true);

    const [auth, setAuth] = React.useState(() => {
        return !!localStorage.getItem("token")
    });

    React.useEffect(() => {
        if (!auth) {
            navigate("/")
        }
    }, [auth]);


    const drawerWidth = 240;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="relative" sx={{ backgroundColor: "#6d28d9", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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