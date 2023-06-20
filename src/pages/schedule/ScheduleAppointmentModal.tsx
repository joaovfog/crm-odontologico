import Close from "@mui/icons-material/Close"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import { useLoadPatients } from "../patients/hooks"
import { DatePickerC, Form, SelectC, TextFieldC } from "../../components"
import * as Yup from 'yup'
import { useCreateAppointment } from "./hooks"

type FormValues = {
    patient: { name: string }
    date: string | null
    time: string | null
    situation: { name: string }
    observation: string
}

const appointmentSchema = Yup.object({
    patient: Yup.object({
        name: Yup.string()
    }).required(),
    date: Yup.string().required(),
    time: Yup.string(),
    situation: Yup.object({
        name: Yup.string()
    }).required(),
    observation: Yup.string()
})

const defaultValues = {
    patient: { name: '' },
    date: '',
    time: '',
    situation: { name: '' },
    observation: ''
}

const appointmentSituations = [
    { name: 'Consulta de Rotina' },
    { name: 'Consulta de Acompanhamento' },
    { name: 'Consulta de Diagnóstico' },
    { name: 'Consulta de Emergência' },
    { name: 'Consulta de Avaliação' },
]

export const ScheduleAppointmentModal = ({ open, onClose }: any) => {
    const { data: patients } = useLoadPatients({})
    const { mutateAsync } = useCreateAppointment()

    const handleSubmit = (data: FormValues) => {
        const date = data.date ? new Date(data.date).toISOString() : null
        const appointmentDate = date?.substring(0, date.indexOf("T"))

        console.log(data)

        const appointmentData = {
            date: appointmentDate,
            time: data.time,
            patientId: data?.patient?.patientId,
            patientName: data?.patient?.name,
            situation: data?.situation?.name,
            observation: data.observation
        }

        mutateAsync(appointmentData)
        console.log(appointmentData)
        onClose(false)
    }

    return (
        <Modal open={open} onClose={() => onClose()} sx={{ margin: { xs: 1 } }}>
            <Card sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
                borderRadius: '12px',
                border: 'none',
                width: { xs: '100%', sm: 700, md: 'auto' },
                height: { xs: 630, sm: 400, md: 500 }
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
                    <Box
                        sx={{
                            height: { xs: 490, sm: 670, md: 'auto' },
                            padding: '10px 0 10px 0'
                        }}
                    >
                        <Form<FormValues>
                            id="create-appointment-form"
                            onSubmit={handleSubmit}
                            schema={appointmentSchema}
                            options={{ defaultValues }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <SelectC name="patient" label="Nome do paciente" getOptionLabel={(option) => option.name} options={patients || []} />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <SelectC
                                        name="situation"
                                        label="Situação"
                                        getOptionLabel={(option) => option.name}
                                        options={appointmentSituations || []}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <DatePickerC
                                        name="date"
                                        label="Data"
                                        inputFormat="dd/MM/yyyy"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextFieldC
                                        name="time"
                                        label="Horário"
                                        placeholder="00:00:00"
                                        sx={{ width: '100%' }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldC
                                        name="observation"
                                        label="Observação"
                                        multiline
                                        rows={4}
                                        sx={{ width: '100%' }}
                                    />
                                </Grid>
                            </Grid>
                        </Form>
                    </Box>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '2px 16px 1px 16px' }}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                            onClose(false)
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ color: '#fff' }}
                        form="create-appointment-form"
                        type="submit"
                    >
                        Salvar
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    )
}