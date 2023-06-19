import { ThemeProvider } from '@mui/material/styles'
import { muiTheme } from "./theme/mui"
import { AppRoutes } from "./routes/Routes"
import { QueryClientProvider } from 'react-query'
import { queryClient } from './lib/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LocalizationProvider, ptBR } from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useIsAuthenticated } from 'react-auth-kit'
import { GuestRoutes } from './routes/GuestRoutes'

function App() {
  const isUserAuthenticated = useIsAuthenticated()

  return (
    <LocalizationProvider localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <ThemeProvider theme={muiTheme}>
          {isUserAuthenticated() ? <AppRoutes /> : <GuestRoutes />}
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  )
}

export default App
