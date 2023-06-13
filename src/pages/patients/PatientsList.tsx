import { Link, useLocation } from "react-router-dom"

import Add from "@mui/icons-material/Add"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useState } from "react"
import { CreatePatientModal } from "./CreatePatientModal"
import Edit from "@mui/icons-material/Edit"
import Delete from "@mui/icons-material/Delete"
import Search from "@mui/icons-material/Search"
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Container from "@mui/material/Container"
import { alpha, styled } from "@mui/material/styles"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputAdornment from "@mui/material/InputAdornment"
import Toolbar from "@mui/material/Toolbar"
import Card from "@mui/material/Card"
import Tooltip from "@mui/material/Tooltip"
import { useDeletePatient, useLoadPatients } from "./hooks"
import { phoneMask } from "../../utils"
import { EditPatientModal } from "./EditPatientModal"

const color = '#919EAB'
const transparent = alpha(color, 0.16)

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 250,
    height: 50,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': {
        width: 320,
        boxShadow: `0 8px 16px 0 ${transparent}`,
    },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
    },
}))

const StyledRoot = styled(Toolbar)(({ theme }) => ({
    height: 80,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 1, 0, 3),
}))

export const PatientsList = () => {
    const [open, setOpen] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(false)
    const [isEditPatientOpen, setIsEditPatientOpen] = useState(false)
    const path = useLocation()

    const { data: patients, isLoading: patientsLoading, isFetching: patientsFetching } = useLoadPatients({})
    const { mutate: deletePatient } = useDeletePatient()

    const handleOpenCreatePatientModal = () => {
        setOpen(true)
    }

    console.log(patients)

    const columns: GridColDef[] = [
        {
            field: 'patientId',
            headerName: 'Código',
            align: 'center',
            headerAlign: 'center',
            width: 80,
            headerClassName: 'super-app-theme--header',
            renderCell: (row: any) => {
                return (
                    <Link
                        style={{
                            textDecoration: 'none',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            justifyItems: 'center',
                            color: '#6eb6ff'
                        }}
                        to={`/patients/${row?.row?.patientId}/details`}
                    >
                        <div style={{ height: 16, fontWeight: 500 }}>{row.value}</div>
                    </Link>
                )
            }
        },
        {
            field: 'name',
            headerName: 'Nome completo',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200
        },
        {
            field: 'phone',
            headerName: 'Telefone',
            headerClassName: 'super-app-theme--header',
            width: 160,
            renderCell: (row) => phoneMask(row.value)
        },
        {
            field: 'actions',
            align: 'center',
            headerName: 'Ações',
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
            renderCell: (row) => {
                const hasPatientInTheUrl = path.pathname === '/' ? `patients/${row?.row?.patientId}/edit` : `${row?.row?.patientId}/edit`
                return (
                    <Box>
                        <IconButton
                            onClick={() => {
                                setSelectedPatient(row.row)
                                setIsEditPatientOpen(true)
                            }}
                        >
                            <Edit fontSize="small" color="primary" />
                        </IconButton>
                        <IconButton onClick={() => deletePatient(row?.row?.patientId)}>
                            <Delete fontSize="small" sx={{ color: '#FF4842' }} />
                        </IconButton>
                    </Box>
                )
            }
        }
    ]

    return (
        <Container>
            {isEditPatientOpen && (
                <EditPatientModal
                    patient={selectedPatient}
                    open={isEditPatientOpen}
                    onClose={() => {
                        setIsEditPatientOpen(false)
                    }}
                />
            )}
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>Pacientes</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add sx={{ color: 'white' }} />}
                    sx={{ textTransform: 'none', fontWeight: 600, color: 'white' }}
                    onClick={handleOpenCreatePatientModal}
                >
                    Adicionar
                </Button>
                <CreatePatientModal open={open} onClose={() => setOpen(false)} />
            </Stack>
            <Card
                sx={{
                    borderRadius: '5px',
                    border: 'none',
                    color: '#212B36',
                    zIndex: 0
                }}
            >
                <StyledRoot
                    sx={{
                        bgcolor: '#fff'
                    }}
                >
                    <StyledSearch
                        placeholder="Procurar paciente..."
                        startAdornment={
                            <InputAdornment position="start">
                                <Search sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                            </InputAdornment>
                        }
                    />
                    <Tooltip title="Filtrar lista">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </StyledRoot>
                <Box sx={{
                    '& .super-app-theme--header': {
                        backgroundColor: '#f4f6f8',
                    }
                }}>
                    <DataGrid
                        rows={patients || []}
                        getRowId={(row: any) => row.patientId}
                        columns={columns}
                        pageSizeOptions={[100]}
                        rowHeight={45}
                        loading={patientsLoading || patientsFetching}
                        sx={{
                            margin: '0.5rem 0',
                            height: { xs: 480, sm: 550, md: 360 },
                            flexGrow: 1,
                            minHeight: '100%',
                            backgroundColor: '#fff',
                            border: 'none'
                        }}
                    />
                </Box>
            </Card>
        </Container>
    )
}