import KeyboardDoubleArrowUp from "@mui/icons-material/KeyboardDoubleArrowUp"
import AttachMoney from "@mui/icons-material/AttachMoney"
import CalendarToday from "@mui/icons-material/CalendarToday"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Box from "@mui/material/Box"

export const Dashboard = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Card>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: 18, fontWeight: 500 }}>CONSULTAS</Typography>
                        <CalendarToday color="primary" sx={{ fontSize: 34, m: '10px 0 10px 0' }} />
                        <Typography sx={{ fontSize: 24 }}>7</Typography>
                        <Typography variant="caption" color="#919191">hoje</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: 18, fontWeight: 500 }}>VENDAS</Typography>
                        <AttachMoney color="primary" sx={{ fontSize: 34, m: '10px 0 10px 0' }} />
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 24 }}>
                                R$ 1.567,50
                            </Typography>
                            <Chip label="+ 15%" color="success" size="small" sx={{ ml: 1.5 }} />
                        </Box>
                        <Typography variant="caption" color="#919191">hoje</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}