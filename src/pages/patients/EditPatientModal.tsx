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
import { useCreatePatient, useLoadPatient, useLoadPatientAddresses, useUpdatePatient } from "./hooks"
import * as Yup from 'yup'
import { DatePickerC, Form, TextFieldC } from "../../components"
import { formatDate } from "../../utils"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import Chip from "@mui/material/Chip"
import Add from "@mui/icons-material/Add"
import { parseISO } from "date-fns"
import { CreatePatientAddressModal } from "./CreatePatientAddressModal"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

type FormValues = {
    name: string
    cpf: string
    email: string
    birthdate: string | null
    phone: string
    observation: string
    street: string
    number: string
    district: string
    city: string
    state: string
    cep: string
}

const patientSchema = Yup.object({
    name: Yup.string().required(),
    cpf: Yup.string().required(),
    email: Yup.string().required(),
    birthdate: Yup.string().required(),
    phone: Yup.string().required(),
    observation: Yup.string(),
    street: Yup.string(),
    number: Yup.string(),
    district: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    cep: Yup.string()
})

const defaultValues = {
    name: '',
    cpf: '',
    email: '',
    birthdate: '',
    phone: '',
    observation: '',
    street: '',
    number: '',
    district: '',
    city: '',
    state: '',
    cep: ''
}

const EditPatientModalProvided = ({ patient, open, onClose }: any) => {
    const { setValue } = useFormContext()
    const { data } = useLoadPatient(patient?.patientId)

    useEffect(() => {
        setValue('name', data?.name)
        setValue('cpf', data?.cpf)
        setValue('email', data?.email)
        setValue('birthdate', parseISO(data?.birthdate))
        setValue('phone', data?.phone)
        setValue('observation', data?.observation)
    }, [data, patient])

    const columns: GridColDef[] = [
        {
            field: 'addressId',
            headerName: 'Cód',
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'super-app-theme--header',
            width: 80
        },
        {
            field: 'street',
            headerName: 'Rua',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 100,
            renderCell: (row: any) => {
                return `${row?.row?.street}, ${row?.row?.district}, ${row?.row?.number}`
            }
        },
        {
            field: 'city',
            headerName: 'Cidade',
            headerClassName: 'super-app-theme--header',
            width: 100
        },
        {
            field: 'state',
            headerName: 'Estado',
            headerClassName: 'super-app-theme--header',
            width: 100
        }
    ]

    return (
        <Modal open={open} onClose={() => onClose()}>
            <Card
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '5px',
                    border: 'none',
                    width: { xs: '100%', sm: 700, md: 700 },
                    height: { xs: 700, sm: 600, md: 500 }
                }}
            >
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: '.5rem' }}>
                        <Typography sx={{ marginBottom: 2, fontSize: 21, fontWeight: 500 }}>Paciente: {data?.name}</Typography>
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
                            height: { xs: 550, sm: 430, md: 350 },
                            padding: '10px 0 10px 0'
                        }}
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
                            {/* <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
                                <div></div>
                                <Button
                                    variant="contained"
                                    startIcon={<Add sx={{ color: 'white' }} />}
                                    sx={{ textTransform: 'none', fontWeight: 600, color: 'white' }}
                                    onClick={() => {
                                        handleOpenAddressModal()
                                        setSelectedPatient(data)
                                    }}
                                    size="small"
                                >
                                    Endereço
                                </Button>
                                {openAddressModal && (
                                    <CreatePatientAddressModal
                                        open={openAddressModal}
                                        onClose={() => setOpenAddressModal(false)}
                                        patient={selectedPatient}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {data?.addresses.length >= 1 ? (
                                    <Box sx={{
                                        '& .super-app-theme--header': {
                                            backgroundColor: '#f4f6f8',
                                        }
                                    }}>
                                        <DataGrid
                                            rows={userAddresses || []}
                                            getRowId={(row: any) => row.addressId}
                                            columns={columns}
                                            pageSizeOptions={[100]}
                                            rowHeight={45}
                                            sx={{
                                                margin: '0.5rem 0',
                                                height: { xs: 480, sm: 550, md: 200 },
                                                flexGrow: 1,
                                                minHeight: '100%',
                                                backgroundColor: '#fff',
                                                border: 'none'
                                            }}
                                        />
                                    </Box>
                                ) : (
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="body2">Nenhum endereço cadastrado para este paciente...</Typography>
                                    </Box>
                                )}
                            </Grid> */}
                        </Grid>
                    </Box>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                    <Button variant="outlined" size="small" onClick={() => {
                        onClose(false)
                    }}>Cancelar</Button>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ color: '#fff' }}
                        form="update-patient-form"
                        type="submit"
                    >
                        Salvar
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    )
}

export const EditPatientModal = (props: any) => {
    const { patient, onClose } = props

    const { mutateAsync } = useUpdatePatient()

    const handleSubmit = async (data: FormValues) => {
        const patientData = {
            patientId: patient?.patientId,
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
        await mutateAsync(patientData)
        onClose(false)
    }

    return (
        <Form<FormValues>
            id="update-patient-form"
            onSubmit={handleSubmit}
            schema={patientSchema}
            options={{ defaultValues }}
        >
            <EditPatientModalProvided {...props} />
        </Form>
    )
}