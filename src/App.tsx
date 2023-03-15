import { ThemeProvider } from '@mui/material'
import { muiTheme } from "./theme/mui"
import { AppRoutes } from "./routes/Routes"
import LocaleProvider from 'antd/es/locale'
import pt_BR from 'antd/locale/pt_BR'

function App() {
  return (
    <LocaleProvider locale={pt_BR}>
      <ThemeProvider theme={muiTheme}>
        <AppRoutes />
      </ThemeProvider>
    </LocaleProvider>
  )
}

export default App
