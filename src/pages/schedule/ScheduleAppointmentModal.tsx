import Close from "@mui/icons-material/Close"
import ErrorOutline from "@mui/icons-material/ErrorOutline"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Modal from "@mui/material/Modal"
import OutlinedInput from "@mui/material/OutlinedInput"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { LocalizationProvider, ptBR } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { useState } from "react"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

const patients = [
    'João Vitor Fogaça',
    'Gabriel F. Fogaça',
    'Tiago da Silva'
]

export const ScheduleAppointmentModal = ({ open, onClose }: any) => {
    const [patient, setPatient] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setPatient(event.target.value as string);
    }

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    return (
        <Modal open={open} onClose={() => onClose()}>
            <Card sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                boxShadow: 18,
                pt: 1,
                pb: 2,
            }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '.5rem' }}>
                        <Typography sx={{ marginBottom: 2, fontSize: 21, fontWeight: 500 }}>Marcar consulta</Typography>
                        <Box
                            sx={{
                                cursor: 'pointer',
                                position: 'fixed',
                                right: 0,
                                top: 0,
                            }}
                        >
                            <IconButton
                                onClick={() => {
                                    onClose(false)
                                }}
                            >
                                <Close />
                            </IconButton>
                        </Box>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Nome do paciente</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={patient}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Nome do paciente" />}
                                    MenuProps={MenuProps}
                                >
                                    {patients.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <LocalizationProvider localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDateFns}>
                                <DatePicker label="Data da consulta" format="dd/MM/yyyy" sx={{ width: '100%' }} />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Chip
                                    label="Verificar horários livres"
                                    onClick={handleClick}
                                    icon={<ErrorOutline />}
                                    sx={{ fontSize: 14, mt: 0.6, fontWeight: 600 }}
                                    color="info"
                                    size="small"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Observação"
                                multiline
                                rows={4}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', padding: '2px 16px 1px 2px' }}>
                    <Button variant="outlined" size="small">Cancelar</Button>
                    <Button variant="contained" size="small" sx={{ color: '#fff' }}>Salvar</Button>
                </CardActions>
            </Card>
        </Modal>
    )
}