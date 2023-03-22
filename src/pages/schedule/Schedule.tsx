import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { ScheduleAppointmentModal } from "./ScheduleAppointmentModal";

const rows = [
    { id: '00001', firstName: 'Jon Tra Volta', date: '18/03/2023', phone: '(00) 00000-0000' },
    { id: '00002', firstName: 'Cersei Arya Ferrara', date: '18/03/2023', phone: '(00) 00000-0000' },
    { id: '00003', firstName: 'Jaime Daenerys', date: '18/03/2023', phone: '(00) 00000-0000' },
    { id: '00004', firstName: 'Arya Cersei', date: '18/03/2023', phone: '(00) 00000-0000' },
    { id: '00005', firstName: 'Daenerys Ferrara', date: '18/03/2023', phone: '(00) 00000-0000' },
    { id: '00006', firstName: 'Larissa Harvey', date: '18/03/2023', phone: '(00) 00000-0000' },
    { id: '00007', firstName: 'Ferrara', date: '18/03/2023', phone: '(00) 00000-0000' },
    { id: '00008', firstName: 'Rossini Jaime', date: '18/03/2023', phone: '(00) 00000-0000' },
    { id: '00009', firstName: 'Harvey Daenerys', date: '18/03/2023', phone: '(00) 00000-0000' },
]

export const Schedule = () => {
    const [open, setOpen] = useState(false)

    const handleOpenScheduleAppointmentModal = () => {
        setOpen(true)
    }
    
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 80
        },
        {
            field: 'firstName',
            headerName: 'Nome completo',
            flex: 1,
            minWidth: 200
        },
        {
            field: 'date',
            headerName: 'Data'
        },
        {
            field: 'phone',
            headerName: 'Telefone',
            width: 160
        },
        {
            field: 'actions',
            align: 'center',
            headerName: 'Ações',
            headerAlign: 'center',
            renderCell: () => {
                return (
                    <Box>
                        <IconButton><Edit fontSize="small" color="primary" /></IconButton>
                        <IconButton><Delete fontSize="small" color="error" /></IconButton>
                    </Box>
                )
            }
        }
    ]

    return (
        <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Consultas</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add sx={{ color: 'white' }} />}
                    size="small"
                    sx={{ textTransform: 'none', fontWeight: 600, color: 'white' }}
                    onClick={handleOpenScheduleAppointmentModal}
                >
                    Adicionar
                </Button>
                <ScheduleAppointmentModal open={open} onClose={() => setOpen(false)} />
            </Box>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                pageSizeOptions={[100]}
                rowHeight={50}
                sx={{ margin: '1rem 0', height: 450 }}
            />
        </Card>
    )
}
