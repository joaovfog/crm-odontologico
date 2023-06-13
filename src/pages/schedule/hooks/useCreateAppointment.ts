import { useMutation, useQueryClient } from "react-query"
import { axios } from "../../../lib/axios"
import { toast } from "react-toastify"

const createAppointment = (data: any): Promise<any> => {
    return axios.post(`consults`, data)
}

export function useCreateAppointment() {
    const queryClient = useQueryClient()

    return useMutation(createAppointment, {
        onSuccess: () => {
            queryClient.invalidateQueries('consults')
            toast.success('Consulta cadastrada com sucesso!')
        },
        onError: (error: unknown) => {
            console.log(error)
            toast.error('Não foi possível cadastrar a consulta')
        }
    })
}
