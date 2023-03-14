import { ThemeProvider } from '@mui/material'
import { muiTheme } from "./theme/mui"
import { AppRoutes } from "./routes/Routes"

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
