import { useNavigate, useParams } from "react-router-dom"
import { useLoadAppointment } from "./hooks"
import Card from "@mui/material/Card"
import { Box, Chip, Grid, IconButton, Typography } from "@mui/material"
import ArrowBack from "@mui/icons-material/ArrowBack"
import { formatDate } from "../../utils"
import ErrorOutline from "@mui/icons-material/ErrorOutline"
import { AssignmentTurnedIn } from "@mui/icons-material"

export const AppointmentsDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const { data: appointment } = useLoadAppointment(id)

    const situation = appointment?.situation === ("Consulta de Rotina" || "Consulta de Acompanhamento" || "Consulta de Avaliação") ? <Chip label={appointment?.situation} size="small" color="primary" sx={{ color: '#fff' }} icon={<AssignmentTurnedIn sx={{ mb: 0.2 }} />} /> : <Chip label={appointment?.situation} size="small" color="warning" sx={{ color: '#fff' }} icon={<ErrorOutline sx={{ mb: 0.2 }} />} />

    console.log(appointment)

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <IconButton onClick={() => navigate('/consults')}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" sx={{ ml: 1, fontWeight: 600 }}>Detalhes da consulta</Typography>
            </Box>
            <Card
                sx={{
                    borderRadius: '5px',
                    border: 'none',
                    color: '#212B36',
                    zIndex: 0,
                    width: 700
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
                            <Typography sx={{ fontSize: 16, mb: 2 }}>{situation}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="grey">Observação</Typography>
                            <Typography sx={{ fontSize: 16, mb: 2 }}>
                                {appointment?.observation}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </>
    )
}