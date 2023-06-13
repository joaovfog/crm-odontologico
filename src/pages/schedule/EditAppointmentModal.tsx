import Card from "@mui/material/Card"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Close from "@mui/icons-material/Close"
import Modal from "@mui/material/Modal"
import * as Yup from 'yup'
import { DatePickerC, Form, SelectC, TextFieldC } from "../../components"
import { useFormContext } from "react-hook-form"
import { useLoadPatients } from "../patients/hooks"
import { useLoadAppointment, useUpdateAppointment } from "./hooks"
import { useEffect } from "react"
import { parseISO } from "date-fns"

type FormValues = {
    patientName: string,
    date: string | null
    time: string | null
    situation: { name: string }
    observation: string
}

const appointmentSchema = Yup.object({
    patientName: Yup.string(),
    date: Yup.string().required(),
    time: Yup.string(),
    situation: Yup.object({
        name: Yup.string()
    }).required(),
    observation: Yup.string()
})

const defaultValues = {
    patientName: '',
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

const EditAppointmentModalProvided = ({ appointment, open, onClose }: any) => {
    const { setValue } = useFormContext()
    const { data } = useLoadAppointment(appointment?.appointmentId)
    const { data: patients } = useLoadPatients({})

    console.log(data)

    useEffect(() => {
        setValue('patient', {
            name: data?.patientName
        })
        setValue('situation', {
            name: data?.situation
        })
        setValue('date', parseISO(data?.date))
        setValue('time', data?.time)
        setValue('observation', data?.observation)
    }, [data, appointment])

    return (
        <Modal open={open} onClose={() => onClose()}>
            <Card
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
                    borderRadius: '12px',
                    border: 'none',
                    width: { xs: '100%', sm: 700, md: 'auto' },
                    height: { xs: 450, sm: 400, md: 480 }
                }}
            >
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '.5rem' }}>
                        <Typography sx={{ marginBottom: 2, fontSize: 21, fontWeight: 500 }}>Consulta do paciente {data?.patientName}</Typography>
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
                            <SelectC name="patient" label="Nome do paciente" getOptionLabel={(option: any) => option?.name} options={patients || []} />
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
                        form="update-appointment-form"
                        type="submit"
                    >
                        Salvar
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    )
}

export const EditAppointmentModal = (props: any) => {
    const { appointment, onClose } = props
    const { mutateAsync } = useUpdateAppointment()

    console.log(appointment)

    const handleSubmit = async (data: FormValues) => {
        const date = data.date ? new Date(data.date).toISOString() : null
        const appointmentDate = date?.substring(0, date.indexOf("T"))

        console.log(appointment)

        const appointmentData = {
            appointmentId: appointment.appointmentId,
            date: appointmentDate,
            time: data.time,
            patientId: appointment?.patientId,
            patientName: appointment?.patientName,
            situation: data?.situation?.name,
            observation: data.observation
        }

        console.log(appointmentData)
        await mutateAsync(appointmentData)
        onClose(false)
    }

    return (
        <Form<FormValues>
            id="update-appointment-form"
            onSubmit={handleSubmit}
            schema={appointmentSchema}
            options={{ defaultValues }}
        >
            <EditAppointmentModalProvided {...props} />
        </Form>
    )
}