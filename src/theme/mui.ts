import { createTheme } from '@mui/material'
import { ptBR } from '@mui/x-date-pickers'

export const muiTheme = createTheme({
    typography: {
        fontFamily: 'Arial',
        fontSize: 14
    },
    palette: {
        primary: {
            main: '#6eb6ff'
        },
        success: {
            main: '#4F9B36'
        }
    },
},
    ptBR
)