import Event from "@mui/icons-material/Event"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { alpha, styled } from "@mui/material/styles"
import { useLoadEmergencyAppointments, useLoadTodayAppointments } from "./hooks";

const StyledIcon = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
}))

export const Dashboard = () => {
    const { data: emergencyAppointments } = useLoadEmergencyAppointments({})
    const { data: todayAppointments } = useLoadTodayAppointments({})

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5, fontWeight: 700, fontSize: '1.5rem' }}>
                Olá, bem-vindo(a) de volta
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        sx={{
                            py: 5,
                            textAlign: 'center',
                            boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
                            borderRadius: '12px',
                            border: 'none',
                        }}
                    >
                        <StyledIcon
                            sx={{
                                color: "#3AA7FF",
                                backgroundImage: () =>
                                    `linear-gradient(135deg, ${alpha("#103996", 0)} 0%, ${alpha(
                                        "#103996",
                                        0.24
                                    )} 100%)`,
                            }}
                        >
                            <Event />
                        </StyledIcon>

                        <Typography variant="h3">{emergencyAppointments}</Typography>

                        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                            Consultas de Emergência
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        sx={{
                            py: 5,
                            textAlign: 'center',
                            boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
                            borderRadius: '12px',
                            border: 'none',
                        }}
                    >
                        <StyledIcon
                            sx={{
                                color: "#3AA7FF",
                                backgroundImage: () =>
                                    `linear-gradient(135deg, ${alpha("#103996", 0)} 0%, ${alpha(
                                        "#103996",
                                        0.24
                                    )} 100%)`,
                            }}
                        >
                            <PeopleAltIcon />
                        </StyledIcon>

                        <Typography variant="h3">{todayAppointments}</Typography>

                        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                            Consultas Hoje
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}