import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
    UseFormProps
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type FormProps<TFormValues extends FieldValues> = {
    onSubmit: SubmitHandler<TFormValues>
    children: React.ReactNode
    options?: UseFormProps<TFormValues>
    id?: string
    schema?: any
}

export const Form = <
    TFormValues extends Record<string, unknown> = Record<string, unknown>
>(
    props: FormProps<TFormValues>
) => {
    const { onSubmit, children, options, id, schema } = props

    const methods = useForm<TFormValues>({
        ...options,
        mode: 'onChange',
        resolver: schema && yupResolver(schema)
    })

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} id={id}>
                {children}
            </form>
        </FormProvider>
    )
}
