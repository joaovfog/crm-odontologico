import Close from "@mui/icons-material/Close"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import { TextFieldC } from "../../components/TextField"
import { Form } from "../../components/Form"
import * as Yup from 'yup'
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useFormContext } from "react-hook-form"
import { useEffect } from "react"
import { useCreatePatientAddress, useLoadPatient } from "./hooks"
import { useParams } from "react-router-dom"

type FormValues = {
    street: string
    number: string
    district: string
    city: string
    state: string
    cep: string
}

const addressSchema = Yup.object({
    street: Yup.string().required(),
    number: Yup.string(),
    district: Yup.string(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    cep: Yup.string()
})

const defaultValues = {
    street: '',
    number: '',
    district: '',
    city: '',
    state: '',
    cep: ''
}

export const CreatePatientAddressModal = ({ open, onClose }: any) => {
    const patientId = useParams()

    const { mutateAsync } = useCreatePatientAddress()

    const handleSubmit = (data: FormValues) => {
        const patientAddressData = {
            ...data,
            patientId: patientId?.id,
            street: data.street,
            number: data.number,
            district: data.district,
            city: data?.city,
            state: data.state,
            cep: data.cep
        }

        console.log(patientAddressData)
        mutateAsync(patientAddressData)
        onClose(false)
    }

    return (
        <Modal open={open} onClose={() => onClose()} sx={{ margin: { xs: 1 } }}>
            <Card
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '5px',
                    border: 'none',
                    width: { xs: '100%', sm: 700, md: 400 },
                    height: { xs: 700, sm: 830, md: 'auto' }
                }}
            >
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '.5rem' }}>
                        <Typography sx={{ marginBottom: 1, fontSize: 21, fontWeight: 500 }}>Cadastro de endereço</Typography>
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
                            id="create-address-form"
                            onSubmit={handleSubmit}
                            schema={addressSchema}
                            options={{ defaultValues }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextFieldC name="cep" label="CEP" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextFieldC name="district" label="Bairro" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextFieldC name="street" label="Rua" />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextFieldC name="number" label="Número" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextFieldC name="city" label="Cidade" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextFieldC name="state" label="Estado" />
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
                        form="create-address-form"
                        type="submit"
                    >
                        Adicionar
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    )
}
