import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import { Form, TextFieldC } from "../../components"
import * as Yup from 'yup'
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import { axios } from "../../lib/axios"
import { useSignIn } from "react-auth-kit"
import { AxiosError } from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

type FormValues = {
    username: string
    password: string
    type: string
}

const defaultValues = {
    username: '',
    password: '',
    type: ''
}

const loginSchema = Yup.object({
    username: Yup.string().required("O nome de usuário é obrigatório"),
    password: Yup.string().required("A senha é obrigatória"),
    type: Yup.string()
})

export const Login = () => {
    const [error, setError] = useState("")
    const signIn = useSignIn()
    const navigate = useNavigate()

    const handleSubmit = async (values: FormValues) => {
        console.log("Values: ", values)
        setError("")

        try {
            const response = await axios.post("/login", values)
            console.log(response)
            signIn({
                token: response?.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { 
                    username: values.username,
                    type: values.type
                }
            })

            console.log({ RESPOSTA: response })

            navigate("/dashboard")
        } catch (err) {
            if (err && err instanceof AxiosError)
                setError(err.response?.data.message)
            else if (err && err instanceof Error)
                setError(err.message)
            console.log()
        }
    };

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
                    Login
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
                        </Grid>
                    </Form>
                    <Button
                        variant="contained"
                        form="login-form"
                        fullWidth
                        type="submit"
                        sx={{ mt: 3, mb: 2, color: '#fff' }}
                    >
                        Login
                    </Button>
                </Box>
            </Card>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    borderRadius: '5px',
                    border: 'none',
                    width: 365,
                    gap: 1,
                    marginTop: 2
                }}
            >
                <Typography variant="caption" sx={{ color: 'gray' }}>
                    Ainda não tem conta?
                </Typography>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate('/register')}
                >
                    Cadastre-se
                </Button>
            </Box>
        </Container>
    )
}
