import { AssignmentTurnedIn, Search } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import FilterListIcon from '@mui/icons-material/FilterList';
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { ScheduleAppointmentModal } from "./ScheduleAppointmentModal";
import { Link } from "react-router-dom";
import { useDeleteAppointment, useLoadAppointments } from "./hooks";
import { formatDate } from "../../utils";
import Chip from "@mui/material/Chip";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { EditAppointmentModal } from "./EditAppointmentModal";

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

export const Schedule = () => {
    const [open, setOpen] = useState(false)

    const [selectedAppointment, setSelectedAppointment] = useState(false)
    const [isEditAppointmentOpen, setIsEditAppointmentOpen] = useState(false)

    const { data: appointments, isLoading: appointmentsLoading, isFetching: appointmentsFetching } = useLoadAppointments({})
    const { mutate: deleteAppointment } = useDeleteAppointment()

    const handleOpenScheduleAppointmentModal = () => {
        setOpen(true)
    }

    const columns: GridColDef[] = [
        {
            field: 'appointmentId',
            headerName: 'Código',
            align: 'center',
            headerAlign: 'center',
            width: 80,
            headerClassName: 'super-app-theme--header',
            renderCell: (row) => {
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
                        to={`/consults/${row.id}/details`}
                    >
                        <div style={{ height: 16, fontWeight: 500 }}>{row.value}</div>
                    </Link>
                )
            }
        },
        {
            field: 'patientName',
            headerName: 'Nome do paciente',
            flex: 1,
            minWidth: 170,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: 'date',
            headerName: 'Data',
            width: 100,
            headerClassName: 'super-app-theme--header',
            renderCell: (row: any) => formatDate(row?.row?.date)
        },
        {
            field: 'time',
            headerName: 'Hora',
            width: 100,
            headerClassName: 'super-app-theme--header',
        },
        {
            field: 'situation',
            headerName: 'Situação',
            width: 200,
            headerClassName: 'super-app-theme--header',
            renderCell: (row: any) => {
                const formatedDate = formatDate(row?.row?.date)
                const today = new Date().toLocaleDateString()

                if (formatedDate < today) {
                    return (
                        <Chip label="Consulta Atrasada" size="small" color="warning" sx={{ color: '#fff' }} />
                    )
                } else {
                    return <Chip label={row?.row?.situation} size="small" color="primary" sx={{ color: '#fff' }} />
                }
            }
        },
        {
            field: 'actions',
            align: 'center',
            headerName: 'Ações',
            headerAlign: 'center',
            headerClassName: 'super-app-theme--header',
            renderCell: (row) => {
                // console.log(row?.row)
                return (
                    <Box>
                        <IconButton
                            onClick={() => {
                                setSelectedAppointment(row.row)
                                setIsEditAppointmentOpen(true)
                            }}
                        >
                            <Edit fontSize="small" color="primary" />
                        </IconButton>
                        <IconButton onClick={() => deleteAppointment(row?.row?.appointmentId)}>
                            <Delete fontSize="small" sx={{ color: '#FF4842' }} />
                        </IconButton>
                    </Box>
                )
            }
        }
    ]

    return (
        <Container>
            {isEditAppointmentOpen && (
                <EditAppointmentModal
                    appointment={selectedAppointment}
                    open={isEditAppointmentOpen}
                    onClose={() => {
                        setIsEditAppointmentOpen(false)
                    }}
                />
            )}
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>Consultas</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add sx={{ color: 'white' }} />}
                    sx={{ textTransform: 'none', fontWeight: 600, color: 'white' }}
                    onClick={handleOpenScheduleAppointmentModal}
                >
                    Adicionar
                </Button>
                <ScheduleAppointmentModal open={open} onClose={() => setOpen(false)} />
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
                        placeholder="Procurar consulta..."
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
                        rows={appointments || []}
                        columns={columns}
                        getRowId={(row) => row?.appointmentId}
                        pageSizeOptions={[100]}
                        rowHeight={45}
                        loading={appointmentsLoading || appointmentsFetching}
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
        // <Card sx={{ p: 2 }}>
        //     <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        //         <Typography variant="h6">Consultas</Typography>
        //         <Button
        //             variant="contained"
        //             startIcon={<Add sx={{ color: 'white' }} />}
        //             size="small"
        //             sx={{ textTransform: 'none', fontWeight: 600, color: 'white' }}
        //             onClick={handleOpenScheduleAppointmentModal}
        //         >
        //             Adicionar
        //         </Button>
        //         <ScheduleAppointmentModal open={open} onClose={() => setOpen(false)} />
        //     </Box>
        //     <DataGrid
        //         rows={rows}
        //         columns={columns}
        //         checkboxSelection
        //         pageSizeOptions={[100]}
        //         rowHeight={50}
        //         sx={{ margin: '1rem 0', height: 450 }}
        //     />
        // </Card>
    )
}
