import { MobileDatePicker } from '@mui/lab'
import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { FieldWrapper } from './FieldWrapper'
import { get as _get } from 'lodash'
import { DatePicker } from '@mui/x-date-pickers'

interface DatePickerCProps {
    name: string
    inputFormat?: string
    style?: any
    label?: string
}

export const DatePickerC = (props: DatePickerCProps) => {
    const { name, label, inputFormat } = props
    const { formState } = useFormContext()

    return (
        <FieldWrapper error={_get(formState.errors, name)}>
            <Controller
                name={name}
                render={({ field }) => (
                    <DatePicker
                        {...field}
                        label={label}
                        format={inputFormat}
                        sx={{ width: '100%' }}
                    />
                    // <MobileDatePicker
                    //     {...field}
                    //     label={label}
                    //     inputFormat={inputFormat}
                    //     cancelText="Cancelar"
                    //     okText="Ok"
                    //     renderInput={(params: any) => (
                    //         <TextField
                    //             size="small"
                    //             fullWidth
                    //             {...params}
                    //             error={_get(formState.errors, name)}
                    //         />
                    //     )}
                    // />
                )}
            />
        </FieldWrapper>
    )
}
