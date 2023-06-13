import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { axios } from '../../../lib/axios'

export const deletePatient = (patientId: string): Promise<any> => {
  return axios.delete(`/patients/${patientId}`)
}

export function useDeletePatient() {
  const queryClient = useQueryClient()
  return useMutation(deletePatient, {
    onSuccess: () => {
      queryClient.invalidateQueries('patients')
      toast.success('Paciente removido com sucesso!')
    },
    onError: (error: unknown) => {
      console.error(error)
      toast.error('Não foi possível remover o paciente!')
    }
  })
}
