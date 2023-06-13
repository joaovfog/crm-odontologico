import {
    Autocomplete,
    AutocompleteRenderOptionState,
    CircularProgress,
    TextField,
    AutocompleteInputChangeReason,
    Box,
    AutocompleteChangeReason,
    AutocompleteChangeDetails
  } from '@mui/material'
  import { Controller, useFormContext } from 'react-hook-form'
  import { FieldWrapper } from './FieldWrapper'
  import { get as _get } from 'lodash'
  import { HTMLAttributes, ReactNode } from 'react'
  
  interface TextFieldProps {
    label?: string
    options: unknown[]
    name: string
    loading?: boolean
    placeholder?: string
    getOptionLabel?: (option: any) => string
    sx?: any
    disabled?: boolean
    defaultValue?: any
    renderOption?: (
      props: HTMLAttributes<HTMLLIElement>,
      option: any,
      state: AutocompleteRenderOptionState
    ) => ReactNode
    onInputChange?: (
      event: React.SyntheticEvent<Element, Event>,
      value: string,
      reason: AutocompleteInputChangeReason
    ) => void
    onChange?: (
      event: React.SyntheticEvent<Element, Event>,
      value: any,
      reason: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<any>
    ) => void
  }
  
  export const SelectC = (props: TextFieldProps) => {
    const {
      label,
      options,
      name,
      loading,
      placeholder,
      getOptionLabel,
      sx,
      onInputChange,
      renderOption,
      disabled,
      defaultValue,
      onChange
    } = props
  
    const { formState } = useFormContext()
    return (
      <Controller
        name={name}
        render={({ field }) => (
          <FieldWrapper error={_get(formState.errors, name)}>
            <Autocomplete
              id={`id-${name}`}
              onChange={(event, item, reason, details) => {
                field.onChange(item)
                onChange?.(event, item, reason, details)
              }}
              value={field.value}
              options={options || []}
              autoHighlight
              noOptionsText="Nenhum resultado encontrado..."
              loadingText="Carregando..."
              autoSelect
              onInputChange={onInputChange}
              loading={loading}
              getOptionLabel={getOptionLabel}
              sx={sx}
              disabled={disabled}
              defaultValue={defaultValue}
              isOptionEqualToValue={(opt, value) => {
                return JSON.stringify(opt) === JSON.stringify(value)
              }}
              renderOption={renderOption}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  placeholder={placeholder}
                  error={!!_get(formState.errors, name)}
                  InputProps={{
                    ...params.InputProps,
                    autoComplete: 'disabled',
                    endAdornment: (
                      <Box
                        sx={{
                          paddingRight: 3.5,
                          display: 'flex',
                          alignSelf: 'center'
                        }}
                      >
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
  
                        {params.InputProps.endAdornment}
                      </Box>
                    )
                  }}
                />
              )}
            />
          </FieldWrapper>
        )}
      />
    )
  }
  
  SelectC.defaultProps = {
    loading: false
  }
  