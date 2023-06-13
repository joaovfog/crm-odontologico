import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { Form, SelectC, TextFieldC } from "../../components"
import Button from "@mui/material/Button"
import * as Yup from 'yup'
import { useCreateUser } from "./hooks"
import { useNavigate } from "react-router-dom"

type FormValues = {
    username: string
    password: string
    type: { id: string, label: string } | null
}

const defaultValues = {
    username: '',
    password: '',
    type: { id: 'N', label: 'NORMAL' }
}

const loginSchema = Yup.object({
    username: Yup.string().required("O nome de usuário é obrigatório"),
    password: Yup.string().required("A senha é obrigatória"),
    type: Yup.object({
        id: Yup.string(),
        label: Yup.string()
    }).required()
})

export const Register = () => {
    const { mutateAsync } = useCreateUser()

    const navigate = useNavigate()

    const handleSubmit = (data: FormValues) => {
        const userData = {
            ...data,
            username: data.username,
            password: data.password,
            type: data.type?.id
        }

        console.log(userData)
        mutateAsync(userData)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Card
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '5px',
                    border: 'none',
                    color: '#212B36',
                    zIndex: 0,
                    width: 300,
                    p: 4
                }}
            >
                <IconButton size="small" color="inherit">
                    <img src="/src/assets/user.png" alt="avatar" style={{ margin: 1, height: 60, width: 60 }} />
                </IconButton>
                <Typography component="h1" variant="h5">
                    Criar Conta
                </Typography>
                <Box sx={{ mt: 5 }}>
                    <Form<FormValues>
                        id="login-form"
                        onSubmit={handleSubmit}
                        schema={loginSchema}
                        options={{ defaultValues }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextFieldC name="username" label="Usuário" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldC name="password" label="Senha" type="password" />
                            </Grid>
                            <Grid item xs={12}>
                                <SelectC
                                    name="type"
                                    options={[
                                        { id: 'A', label: 'ADMINISTRADOR' },
                                        { id: 'N', label: 'NORMAL' }
                                    ]}
                                    label="Tipo Usuário"
                                />
                            </Grid>
                        </Grid>
                    </Form>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/login")}
                            sx={{ mt: 3 }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            form="login-form"
                            type="submit"
                            sx={{ mt: 3, color: '#fff' }}
                        >
                            Inscrever-se
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Container>
    )
}