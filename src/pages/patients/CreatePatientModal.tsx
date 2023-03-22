import { useNavigate } from "react-router-dom"

import Card from "@mui/material/Card"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { LocalizationProvider, ptBR } from "@mui/x-date-pickers"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import ArrowBack from "@mui/icons-material/ArrowBack"
import Close from "@mui/icons-material/Close"
import Modal from "@mui/material/Modal"

export const CreatePatientModal = ({ open, onClose }: any) => {
    const navigation = useNavigate()

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
                        <Typography sx={{ marginBottom: 2, fontSize: 21, fontWeight: 500 }}>Dados do paciente</Typography>
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
                            <TextField
                                id="outlined-basic"
                                label="Nome do paciente"
                                variant="outlined"
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="outlined-basic"
                                label="CPF"
                                variant="outlined"
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} display={'flex'} justifyContent={'space-around'} alignItems={'center'}>
                            <Box>
                                <Typography variant="body1">Sexo</Typography>
                            </Box>
                            <Box>
                                <FormControlLabel control={<Checkbox />} label="Masculino" />
                                <FormControlLabel control={<Checkbox />} label="Feminino" />
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <LocalizationProvider localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDateFns}>
                                <DatePicker label="Data de nascimento" format="dd/MM/yyyy" sx={{ width: '100%' }} />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <TextField
                                id="outlined-basic"
                                label="Celular"
                                placeholder="(00) 00000-0000"
                                variant="outlined"
                                sx={{ width: '100%' }}
                            />
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
                    <Typography sx={{ marginBottom: 2, marginTop: 2, fontSize: 21, fontWeight: 500 }}>Endereço do paciente</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="outlined-basic"
                                label="CEP"
                                variant="outlined"
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="outlined-basic"
                                label="Rua"
                                variant="outlined"
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="outlined-basic"
                                label="Cidade"
                                variant="outlined"
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="outlined-basic"
                                label="Estado"
                                variant="outlined"
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
                    <Button variant="outlined" size="small">Cancelar</Button>
                    <Button variant="contained" size="small" sx={{ color: '#fff' }}>Salvar</Button>
                </CardActions>
            </Card>
        </Modal>
    )
}