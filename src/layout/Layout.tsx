import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

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
import NotificationsNone from '@mui/icons-material/NotificationsNone'
import Dashboard from '@mui/icons-material/Dashboard'
import ExitToApp from '@mui/icons-material/ExitToApp'
import InsertInvitation from '@mui/icons-material/InsertInvitation'
import People from '@mui/icons-material/People'
import { styled } from "@mui/material/styles";
import { useAuthUser, useSignOut } from "react-auth-kit";

const drawerWidth = 240

interface Props {
    window?: () => Window;
    children: React.ReactNode
}

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const Main = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    background: '#F7F7F7',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}))

export default function Layout(props: Props) {
    const { window, children } = props

    const signOut = useSignOut()
    const authUser = useAuthUser()
    const navigate = useNavigate()

    console.log(authUser())

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    const container = window !== undefined ? () => window().document.body : undefined

    const logout = () => {
        signOut()
        navigate("/login")
    }

    const drawer = (
        <div>
            <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', padding: 2 }}>
                <Box
                    sx={{
                        background: '#EDEDED',
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
                                {authUser()?.username}
                            </Box>
                            {/* <Box sx={{ fontSize: 10, fontWeight: 500, color: '#23571b' }}>
                                Administrador
                            </Box> */}
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
                        <Link to="/consults" style={{ textDecoration: 'none', fontFamily: 'Arial', fontWeight: 400, lineHeight: 1.5, color: '#000000DE' }}>
                            <ListItemText primary="Consultas" />
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
            <Box sx={{ position: 'absolute', bottom: '0px', margin: '0px 0px 20px 40px' }}>
                <img src="/src/assets/logo.png" alt="clinic-software logo" style={{ width: 145, height: 30 }} />
            </Box>
        </div>
    )

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                minHeight: '100vh',
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
                    <Box>
                        <IconButton sx={{ color: 'white' }}>
                            <NotificationsNone />
                        </IconButton>
                        <IconButton onClick={logout} sx={{ color: 'white' }}>
                            <ExitToApp />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{
                    width: { sm: drawerWidth },
                    flexShrink: { sm: 0 }
                }}
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
                    PaperProps={{
                        sx: {
                            backgroundColor: "#F7F7F7"
                        }
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
                    PaperProps={{
                        sx: {
                            backgroundColor: "#F7F7F7"
                        }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Main>
                {children}
            </Main>
        </Box>
    )
}