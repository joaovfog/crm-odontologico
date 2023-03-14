import { Add } from "@mui/icons-material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

const drawerWidth = 240

const rows = [
    { id: '00001', firstName: 'Jon Tra Volta', phone: '(00) 00000-0000' },
    { id: '00002', firstName: 'Cersei Arya Ferrara', phone: '(00) 00000-0000' },
    { id: '00003', firstName: 'Jaime Daenerys', phone: '(00) 00000-0000' },
    { id: '00004', firstName: 'Arya Cersei', phone: '(00) 00000-0000' },
    { id: '00005', firstName: 'Daenerys Ferrara', phone: '(00) 00000-0000' },
    { id: '00006', firstName: 'Larissa Harvey', phone: '(00) 00000-0000' },
    { id: '00007', firstName: 'Ferrara', phone: '(00) 00000-0000' },
    { id: '00008', firstName: 'Rossini Jaime', phone: '(00) 00000-0000' },
    { id: '00009', firstName: 'Harvey Daenerys', phone: '(00) 00000-0000' },
]

export const PatientsList = () => {
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
            field: 'phone',
            headerName: 'Telefone',
            width: 160
        },
    ]

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Pacientes</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    size="small"
                    sx={{ textTransform: 'none' }}
                >
                    Adicionar
                </Button>
            </Box>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                pageSizeOptions={[100]}
                rowHeight={50}
                sx={{ margin: '1rem 0', height: 450 }}
            />
        </>
    )
}