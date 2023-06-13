import { TextField as MuiTextField } from '@mui/material'
import { CSSProperties } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FieldWrapper } from './FieldWrapper'
import { get as _get } from 'lodash'
// import MaskedInput from 'react-text-mask'

interface TextFieldProps {
    name: string
    label?: string
    placeholder?: string
    type?: string
    style?: CSSProperties
    inputProps?: any
    mask?: string
    autoFocus?: boolean
    sx?: any
    multiline?: boolean
    rows?: number
    normalize?: (value: string) => void
    onChange?: (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void
    disabled?: boolean
    InputProps?: any
}

export const TextFieldC = (props: TextFieldProps) => {
    const {
        label,
        placeholder,
        type,
        style,
        inputProps,
        autoFocus,
        sx,
        multiline,
        rows,
        name,
        onChange,
        normalize,
        disabled,
        InputProps
    } = props

    const { formState } = useFormContext()
    return (
        <Controller
            name={name}
            render={({ field }) => (
                <FieldWrapper error={_get(formState.errors, name)}>
                    <MuiTextField
                        {...field}
                        onChange={(e) => {
                            onChange?.(e)
                            if (normalize) field.onChange(normalize(e.target.value))
                            else field.onChange(e.target.value.toUpperCase())
                        }}
                        label={label}
                        disabled={disabled}
                        error={!!_get(formState.errors, name)}
                        placeholder={placeholder}
                        autoComplete="no"
                        size="medium"
                        type={type}
                        inputProps={inputProps}
                        autoFocus={autoFocus}
                        sx={sx}
                        multiline={multiline}
                        rows={rows}
                        InputProps={InputProps}
                        style={{
                            width: '100%',
                            height: '100%',
                            ...style
                        }}
                    />
                </FieldWrapper>
            )}
        />
    )
}

TextFieldC.defaultProps = {
    autoFocus: false,
    type: 'text',
    multiline: false,
    rows: 1
}
