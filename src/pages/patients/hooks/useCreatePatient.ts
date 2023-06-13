import { useMutation, useQueryClient } from "react-query"
import { axios } from "../../../lib/axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const createPatient = (data: any): Promise<any> => {
    return axios.post(`patients`, data)
}

export function useCreatePatient() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation(createPatient, {
        onSuccess: () => {
            queryClient.invalidateQueries('patients')
            toast.success('Paciente cadastrado com sucesso!')
            navigate('/patients')
        },
        onError: (error: unknown) => {
            console.log(error)
            toast.error('Não foi possível cadastrar o paciente')
        }
    })
}
