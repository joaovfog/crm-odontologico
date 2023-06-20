import Card from "@mui/material/Card"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { LocalizationProvider, ptBR } from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Close from "@mui/icons-material/Close"
import Modal from "@mui/material/Modal"
import { useCreatePatient } from "./hooks"
import * as Yup from 'yup'
import { DatePickerC, Form, TextFieldC } from "../../components"
import { formatDate } from "../../utils"

type FormValues = {
    name: string
    cpf: string
    email: string
    birthdate: string | null
    phone: string
    observation: string
}

const patientSchema = Yup.object({
    name: Yup.string().required(),
    cpf: Yup.string().required(),
    email: Yup.string().required(),
    birthdate: Yup.string().required(),
    phone: Yup.string().required(),
    observation: Yup.string()
})

const defaultValues = {
    name: '',
    cpf: '',
    email: '',
    birthdate: '',
    phone: '',
    observation: ''
}

export const CreatePatientModal = ({ open, onClose }: any) => {
    const { mutateAsync } = useCreatePatient()

    const handleSubmit = (data: FormValues) => {
        const patientData = {
            ...data,
            name: data.name,
            cpf: data.cpf,
            email: data.email,
            birthdate: data?.birthdate
                ? formatDate(new Date(data?.birthdate)?.toISOString(), 'yyyy-MM-dd')
                : null,
            phone: data.phone,
            observation: data.observation
        }

        console.log(patientData)
        mutateAsync(patientData)
        onClose(false)
    }

    return (
        <Modal open={open} onClose={() => onClose()} sx={{ margin: { xs: 1 } }}>
            <Card sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '5px',
                border: 'none',
                width: { xs: '100%', sm: 700, md: 700 },
                height: { xs: 700, sm: 830, md: 510 }
            }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '.5rem' }}>
                        <Typography sx={{ marginBottom: 2, fontSize: 21, fontWeight: 500 }}>Cadastro de paciente</Typography>
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
                            height: { xs: 550, sm: 670, md: 'auto' },
                            padding: '10px 0 10px 0'
                        }}
                    >
                        <Form<FormValues>
                            id="create-patient-form"
                            onSubmit={handleSubmit}
                            schema={patientSchema}
                            options={{ defaultValues }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <TextFieldC name="name" label="Nome do paciente" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextFieldC name="cpf" label="CPF" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextFieldC name="email" label="E-mail" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <DatePickerC
                                        name="birthdate"
                                        label="Data de nascimento"
                                        inputFormat="dd/MM/yyyy"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextFieldC name="phone" label="Telefone" />
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
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
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
                        form="create-patient-form"
                        type="submit"
                    >
                        Salvar
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    )
}