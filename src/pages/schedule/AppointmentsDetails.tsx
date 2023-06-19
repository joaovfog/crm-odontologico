import { useNavigate, useParams } from "react-router-dom"
import { useLoadAppointment } from "./hooks"
import Card from "@mui/material/Card"
import { Box, Chip, Grid, IconButton, Typography } from "@mui/material"
import ArrowBack from "@mui/icons-material/ArrowBack"
import { formatDate } from "../../utils"

export const AppointmentsDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const { data: appointment } = useLoadAppointment(id)

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <IconButton onClick={() => navigate('/consults')}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" sx={{ ml: 1, fontWeight: 600 }}>Detalhes da consulta</Typography>
            </Box>
            <Box sx={{ padding: { xs: 1.5, sm: 1.5 } }}>
                <Card
                    sx={{
                        borderRadius: '5px',
                        border: 'none',
                        color: '#212B36',
                        zIndex: 0,
                        width: { xs: 350, sm: 500, md: 700 },
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Grid container>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography variant="body2" color="grey">Código</Typography>
                                <Typography sx={{ fontSize: 16, mb: 2 }}>{appointment?.appointmentId}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography variant="body2" color="grey">Nome do paciente</Typography>
                                <Typography sx={{ fontSize: 16, mb: 2 }}>Gabriel Furlan Fogaça</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography variant="body2" color="grey">Data - Hora</Typography>
                                <Typography sx={{ fontSize: 16, mb: 2 }}>{formatDate(appointment?.date)} - {appointment?.time}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography variant="body2" color="grey">Situação</Typography>
                                <Chip label={appointment?.situation} size="small" color="primary" sx={{ color: '#fff', mb: 2 }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" color="grey">Observação</Typography>
                                <Typography sx={{ fontSize: 16 }}>
                                    {appointment?.observation}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Box>
        </>
    )
}