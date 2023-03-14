import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu'

import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { AppBar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box, Button, Card } from "@mui/material";
import { Dashboard, ExitToApp, InsertInvitation, People } from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";

const drawerWidth = 240

const drawer = (
    <div>
        <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', padding: 2 }}>
            <Box
                sx={{
                    background: '#f2f5f9',
                    width: 240,
                    borderRadius: 2,
                }}
            >
                <Box
                    sx={{
                        padding: '1px',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <IconButton size="small" color="inherit">
                        <img src="/src/assets/user.png" alt="avatar" style={{ margin: 'auto', height: 36, width: 36 }} />
                    </IconButton>
                    <Box sx={{ marginLeft: 2 }}>
                        <Box sx={{ fontSize: 12, fontWeight: 500 }}>
                            JOÃO VITOR FOGAÇA
                        </Box>
                        <Box sx={{ fontSize: 10, fontWeight: 500, color: '#23571b' }}>
                            Administrador
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        {/* <Divider /> */}
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <Link to="/" style={{ textDecoration: 'none', fontFamily: 'Arial', fontWeight: 400, lineHeight: 1.5, color: '#000000DE' }}>
                        <ListItemText primary="Dashboard" />
                    </Link>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <People />
                    </ListItemIcon>
                    <Link to="/patients" style={{ textDecoration: 'none', fontFamily: 'Arial', fontWeight: 400, lineHeight: 1.5, color: '#000000DE' }}>
                        <ListItemText primary="Pacientes" />
                    </Link>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <InsertInvitation />
                    </ListItemIcon>
                    <Link to="/schedule" style={{ textDecoration: 'none', fontFamily: 'Arial', fontWeight: 400, lineHeight: 1.5, color: '#000000DE' }}>
                        <ListItemText primary="Agenda" />
                    </Link>
                </ListItemButton>
            </ListItem>
        </List>
    </div>
)

interface Props {
    window?: () => Window;
}

export default function Layout(props: Props) {
    const { window } = props

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    const container = window !== undefined ? () => window().document.body : undefined

    return (
        <Box sx={{
            display: 'flex', flex: 1,
            flexDirection: 'row',
            height: '100vh'
        }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Odonto CRM
                    </Typography>
                    <IconButton color="inherit">
                        <ExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flex: 1,
                    p: 3,
                    mt: 8,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    height: 'auto',
                    background: '#f8f8f8',
                }}
            >
                <Card sx={{ p: 2 }}>
                    <Outlet />
                </Card>
            </Box>
        </Box>
    )
}