import { createTheme } from '@mui/material'
import { ptBR } from '@mui/x-date-pickers'
import { alpha } from '@mui/material/styles'

const color = '#919EAB'
const transparent = alpha(color, 0.16)

export const muiTheme = createTheme({
    typography: {
        fontFamily: '"Public Sans", sans-serif',
        fontSize: 14
    },
    palette: {
        primary: {
            main: '#3AA7FF'
        },
        success: {
            main: '#4F9B36'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                sizeLarge: {
                    height: 48,
                },
                containedInherit: {
                    color: '#212B36',
                    boxShadow: `0 8px 16px 0 ${transparent}`,
                    '&:hover': {
                        backgroundColor: '#C4CDD5',
                    },
                },
                containedPrimary: {
                    boxShadow: `0 8px 16px 0 ${alpha('#2065D1', 0.24)}`,
                },
                containedSecondary: {
                    boxShadow: `0 8px 16px 0 ${alpha('#3366FF', 0.24)}`,
                },
                outlinedInherit: {
                    border: `1px solid ${alpha('#919EAB', 0.32)}`,
                    '&:hover': {
                        backgroundColor: alpha('#919EAB', 0.08),
                    },
                },
                textInherit: {
                    '&:hover': {
                        backgroundColor: alpha('#919EAB', 0.08),
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
              paragraph: {
                marginBottom: 2,
              }
            },
          }
    }
},
    ptBR
)