import storage from "../utils/storage";
import { configureAuth } from 'react-query-auth'
import { axios } from "./axios";
import CircularProgress from "@mui/material/CircularProgress";

type AuthUser = {
    userId: string
    username: string
}

type UserResponse = AuthUser & {
    token: string
}


type LoginCredentialsDTO = {
    username: string
    password: string
}

const loginWithUsernameAndPassword = (
    data: LoginCredentialsDTO
): Promise<any> => {
    return axios.post('/login', data)
}

async function handleUserResponse(data: UserResponse) {
    const { token, ...user } = data
    storage.setToken(token)
    return { ...user }
}

async function loginFn(data: LoginCredentialsDTO) {
    const response = await loginWithUsernameAndPassword(data)
    const user = await handleUserResponse(response)
    
    return user
}

const authConfig = {
    loginFn,
    LoaderComponent() {
      return (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress size={80} />
        </div>
      )
    }
  }

export const { AuthProvider, useAuth } = initReactQueryAuth<
    AuthUser | null,
    unknown,
    LoginCredentialsDTO,
    undefined
>(authConfig)
