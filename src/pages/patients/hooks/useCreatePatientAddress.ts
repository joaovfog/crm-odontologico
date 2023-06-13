import { useMutation, useQueryClient } from "react-query"
import { axios } from "../../../lib/axios"
import { toast } from "react-toastify"

const createPatientAddress = (data: any): Promise<any> => {
    return axios.post(`patientWithAddress`, data)
}

export function useCreatePatientAddress() {
    const queryClient = useQueryClient()

    return useMutation(createPatientAddress, {
        onSuccess: () => {
            queryClient.invalidateQueries('patientAddresses')
            toast.success('Endereço cadastrado com sucesso!')
        },
        onError: (error: unknown) => {
            console.log(error)
            toast.error('Não foi possível cadastrar o endereço')
        }
    })
}
