import ArrowBack from "@mui/icons-material/ArrowBack"
import Check from "@mui/icons-material/Check"
import ErrorOutline from "@mui/icons-material/ErrorOutline"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { GridColDef } from "@mui/x-data-grid"
import { DataGrid } from "@mui/x-data-grid/DataGrid"
import { useNavigate } from "react-router-dom"

const rows = [
    { id: '123456', date: '22/03/2023 09:30', status: 'Agendada' },
    { id: '456789', date: '22/02/2023 14:30', status: 'Finalizada' },
    { id: '789123', date: '22/01/2023 11:30', status: 'Finalizada' },
]

export const PatientsDetails = () => {
    const navigate = useNavigate()

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Código',
            width: 80
        },
        {
            field: 'date',
            headerName: 'Data',
            flex: 1,
            minWidth: 130
        },
        {
            field: 'status',
            headerName: 'Situação',
            headerAlign: 'center',
            align: 'center',
            width: 120,
            renderCell: (row) => {
                if (row?.row?.status === 'Agendada') {
                    return (
                        <Chip label={row?.value} size="small" color="primary" sx={{ color: '#fff' }} icon={<ErrorOutline sx={{ mb: 0.2 }} />} />
                    )
                } else {
                    return (
                        <Chip label={row?.value} size="small" color="success" icon={<Check />} />
                    )
                }
            }
        }
    ]

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <IconButton onClick={() => navigate('/patients')}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h6" sx={{ ml: 1, fontSize: 21, fontWeight: 500 }}>Detalhes do paciente</Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px' }}>
                        <CardContent>
                            <Typography variant="body1">INFORMAÇÕES GERAIS</Typography>
                        </CardContent>
                        <Divider />
                        <Box sx={{ p: 2 }}>
                            <Grid container>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="body2" color="grey">Código</Typography>
                                    <Typography sx={{ fontSize: 16, mb: 2 }}>000001</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="body2" color="grey">Nome completo</Typography>
                                    <Typography sx={{ fontSize: 16, mb: 2 }}>JOÃO VITOR FOGAÇA</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="body2" color="grey">Celular</Typography>
                                    <Typography sx={{ fontSize: 16, mb: 2 }}>(55) 99109-5535</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="body2" color="grey">E-mail</Typography>
                                    <Typography sx={{ fontSize: 16, mb: 2 }}>joao.vf@sou.unijui.edu.br</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="body2" color="grey">CPF</Typography>
                                    <Typography sx={{ fontSize: 16, mb: 2 }}>042.512.670-60</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="body2" color="grey">Data de nascimento</Typography>
                                    <Typography sx={{ fontSize: 16, mb: 2 }}>27/07/1999</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px' }}>
                        <CardContent>
                            <Typography variant="body1">ENDEREÇO</Typography>
                        </CardContent>
                        <Divider />
                        <Box sx={{ p: 2 }}>
                            <Grid container>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="body2" color="grey">Rua</Typography>
                                    <Typography sx={{ fontSize: 16, mb: 2 }}>General Osório</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="body2" color="grey">Número</Typography>
                                    <Typography sx={{ fontSize: 16, mb: 2 }}>1725</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="body2" color="grey">CEP</Typography>
                                    <Typography sx={{ fontSize: 16, mb: 2 }}>98015-130</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="body2" color="grey">Bairro</Typography>
                                    <Typography sx={{ fontSize: 16, mb: 2 }}>Malheiros</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="body2" color="grey">Cidade</Typography>
                                    <Typography sx={{ fontSize: 16, mb: 2 }}>Cruz Alta</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="body2" color="grey">Estado</Typography>
                                    <Typography sx={{ fontSize: 16, mb: 2 }}>RS</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px' }}>
                        <CardContent>
                            <Typography>CONSULTAS</Typography>
                        </CardContent>
                        <Divider />
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            checkboxSelection
                            pageSizeOptions={[100]}
                            rowHeight={50}
                            sx={{ height: 261 }}
                        />
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}