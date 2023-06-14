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
import { useNavigate, useParams } from "react-router-dom"
import { useLoadPatient, useLoadPatientAddresses } from "./hooks"
import { cepMask, cnpjCpfMask, formatDate, phoneMask } from "../../utils"
import { useState } from "react"
import Button from "@mui/material/Button"
import Add from "@mui/icons-material/Add"
import { CreatePatientAddressModal } from "./CreatePatientAddressModal"

export const PatientsDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const { data: patient } = useLoadPatient(id)
    const { data: patientAddresses, isFetching, isLoading } = useLoadPatientAddresses(id)

    const [open, setOpen] = useState(false)

    console.log(patientAddresses)

    const appointment = patient?.appointments?.map((appointment: any) => appointment) || []

    const handleOpenCreatePatientAddressModal = () => {
        setOpen(true)
    }

    const columns: GridColDef[] = [
        {
            field: 'appointmentId',
            headerName: 'Código',
            width: 80,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: 'date',
            headerName: 'Data',
            flex: 1,
            minWidth: 130,
            headerClassName: 'super-app-theme--header',
            renderCell: (row: any) => formatDate(row?.row?.date)
        },
        {
            field: 'time',
            headerName: 'Hora',
            headerClassName: 'super-app-theme--header'
        },
        {
            field: 'situation',
            headerName: 'Situação',
            width: 200,
            headerClassName: 'super-app-theme--header',
            renderCell: (row) => {
                if (row?.row?.situation === '1') {
                    return (
                        <Chip label="Aguardando confirmação" size="small" color="primary" sx={{ color: '#fff' }} icon={<ErrorOutline sx={{ mb: 0.2 }} />} />
                    )
                } else {
                    return (
                        <Chip label="Confirmada" size="small" color="success" icon={<Check />} />
                    )
                }
            }
        }
    ]

    const addressColumns: GridColDef[] = [
        {
            field: 'addressId',
            headerName: 'Cód',
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'super-app-theme--header',
            width: 80
        },
        {
            field: 'street',
            headerName: 'Rua',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 100,
            renderCell: (row: any) => {
                return `${row?.row?.street}, ${row?.row?.district}, ${row?.row?.number}`
            }
        },
        {
            field: 'city',
            headerName: 'Cidade',
            headerClassName: 'super-app-theme--header',
            width: 100
        },
        {
            field: 'state',
            headerName: 'Estado',
            headerClassName: 'super-app-theme--header',
            width: 100
        }
    ]

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <IconButton onClick={() => navigate('/patients')}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" sx={{ ml: 1, fontWeight: 600 }}>Detalhes do paciente</Typography>
            </Box>
            <Grid container spacing={2} sx={{ padding: { xs: 1.5, sm: 1.5 } }}>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card
                                sx={{
                                    // boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
                                    borderRadius: '5px',
                                    border: 'none',
                                    color: '#212B36',
                                    zIndex: 0
                                }}
                            >
                                <CardContent>
                                    <Typography sx={{ fontSize: 21, fontWeight: 500 }}>Informações básicas</Typography>
                                </CardContent>
                                <Divider />
                                <Box sx={{ p: 2 }}>
                                    <Grid container>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <Typography variant="body2" color="grey">Código</Typography>
                                            <Typography sx={{ fontSize: 16, mb: 2 }}>{patient?.patientId}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <Typography variant="body2" color="grey">Nome completo</Typography>
                                            <Typography sx={{ fontSize: 16, mb: 2 }}>{patient?.name}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <Typography variant="body2" color="grey">Celular</Typography>
                                            <Typography sx={{ fontSize: 16, mb: 2 }}>{phoneMask(patient?.phone)}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <Typography variant="body2" color="grey">E-mail</Typography>
                                            <Typography sx={{ fontSize: 16, mb: 2 }}>{patient?.email}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <Typography variant="body2" color="grey">CPF</Typography>
                                            <Typography sx={{ fontSize: 16, mb: 2 }}>{cnpjCpfMask(patient?.cpf)}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <Typography variant="body2" color="grey">Data de nascimento</Typography>
                                            <Typography sx={{ fontSize: 16, mb: 2 }}>{formatDate(patient?.birthdate)}</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card
                                sx={{
                                    // boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
                                    borderRadius: '5px',
                                    border: 'none',
                                    color: '#212B36',
                                    zIndex: 0
                                }}
                            >
                                <CardContent>
                                    <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
                                        <div>
                                            <Typography sx={{ fontSize: 21, fontWeight: 500 }}>Endereço</Typography>
                                        </div>
                                        <Button
                                            variant="contained"
                                            startIcon={<Add sx={{ color: 'white' }} />}
                                            sx={{ textTransform: 'none', fontWeight: 600, color: 'white' }}
                                            onClick={handleOpenCreatePatientAddressModal}
                                        >
                                            Adicionar
                                        </Button>
                                    </Grid>
                                    <CreatePatientAddressModal open={open} onClose={() => setOpen(false)} />
                                    <Grid item xs={12}>
                                        {patientAddresses?.length >= 1 ? (
                                            <DataGrid
                                                rows={patientAddresses || []}
                                                getRowId={(row: any) => row.addressId}
                                                columns={addressColumns}
                                                pageSizeOptions={[100]}
                                                loading={isLoading || isFetching}
                                                rowHeight={45}
                                                sx={{
                                                    margin: '0.5rem 0',
                                                    height: { xs: 480, sm: 550, md: 195 },
                                                    flexGrow: 1,
                                                    minHeight: '100%',
                                                    backgroundColor: '#fff',
                                                    border: 'none'
                                                }}
                                            />
                                        ) : (
                                            <Box sx={{ p: 2 }}>
                                                <Typography variant="body2" color="grey">Não há endereço(s) cadastrado para este paciente...</Typography>
                                            </Box>
                                        )}
                                    </Grid>
                                </CardContent>
                                {/* <Divider />
                                {patient?.addresses.length >= 1 ? (
                                    <DataGrid
                                        rows={patient?.addresses || []}
                                        getRowId={(row: any) => row.addressId}
                                        columns={addressColumns}
                                        pageSizeOptions={[100]}
                                        rowHeight={45}
                                        sx={{
                                            margin: '0.5rem 0',
                                            height: { xs: 480, sm: 550, md: 195 },
                                            flexGrow: 1,
                                            minHeight: '100%',
                                            backgroundColor: '#fff',
                                            border: 'none'
                                        }}
                                    />
                                ) : (
                                    <Box sx={{ p: 2 }}>
                                        <Typography variant="body2" color="grey">Não há endereço(s) cadastrado para este paciente...</Typography>
                                    </Box>
                                )} */}
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            borderRadius: '5px',
                            border: 'none',
                            color: '#212B36',
                            zIndex: 0
                        }}
                    >
                        <CardContent>
                            <Typography sx={{ fontSize: 21, fontWeight: 500 }}>Histórico de consultas</Typography>
                        </CardContent>
                        {/* <Divider /> */}
                        <Box sx={{
                            '& .super-app-theme--header': {
                                backgroundColor: '#f4f6f8',
                            }
                        }}>
                            <DataGrid
                                rows={appointment || []}
                                getRowId={(row: any) => row.appointmentId}
                                columns={columns}
                                pageSizeOptions={[100]}
                                rowHeight={50}
                                sx={{ height: 504 }}
                            />
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}