import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import IconButton from "@mui/material/IconButton";

import MenuIcon from '@mui/icons-material/Menu'
import Dashboard from '@mui/icons-material/Dashboard'
import ExitToApp from '@mui/icons-material/ExitToApp'
import InsertInvitation from '@mui/icons-material/InsertInvitation'
import People from '@mui/icons-material/People'

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
                        <Box sx={{ fontSize: 12, fontWeight: 500, color: 'black' }}>
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
                    <Link to="/dashboard" style={{ textDecoration: 'none', fontFamily: 'Arial', fontWeight: 400, lineHeight: 1.5, color: '#000000DE' }}>
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
        <Box sx={{ position: 'absolute', bottom: '0px', margin: '0px 0px 20px 75px' }}>
            <img src="/src/assets/logo.png" alt="clinic-software logo" style={{ width: 80, height: 90 }} />
        </Box>
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
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                minHeight: '100vh'
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
                        sx={{ mr: 2, display: { sm: 'none' }, color: '#fff' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box />
                    <IconButton sx={{ color: 'white' }}>
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
                <Outlet />
            </Box>
        </Box>
    )
}