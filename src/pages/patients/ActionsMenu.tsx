import Delete from "@mui/icons-material/Delete"
import { useDeletePatient } from "./hooks"
import Edit from "@mui/icons-material/Edit"
import { useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import IconButton from "@mui/material/IconButton"
import { MoreVert } from "@mui/icons-material"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"

export function ActionsMenu(props: any) {
    const navigation = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const path = useLocation()

    const { row } = props

    console.log(row.patientId)

    const { mutate: deletePatient } = useDeletePatient()

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }


    const hasPatientInTheUrl = path.pathname === '/' ? `patients/${row?.row?.patientId}/edit` : `${row?.row?.patientId}/edit`

    const actions = useMemo(
        () => [
            {
                label: 'Editar',
                icon: Edit,
                key: '1',
                onClick: () => console.log(navigation(hasPatientInTheUrl))
            },
            {
                label: 'Remover',
                icon: Delete,
                key: '2',
                onClick: () => deletePatient(row.patientId)
            },
        ],
        [
            deletePatient,
        ]
    )

    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreVert />
            </IconButton>
            {!!anchorEl && (
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button'
                    }}
                >
                    {actions.map((menuItem) => {
                        const Icon = menuItem.icon
                        return (
                            <MenuItem
                                key={menuItem.key}
                                onClick={menuItem.onClick}
                            >
                                <ListItemIcon>
                                    <Icon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>{menuItem.label}</ListItemText>
                                <Typography variant="body2" color="text.secondary"></Typography>
                            </MenuItem>
                        )
                    })}
                </Menu>
            )}
        </>
    )
}