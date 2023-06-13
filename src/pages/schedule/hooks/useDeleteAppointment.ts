import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { axios } from '../../../lib/axios'

export const deleteAppointment = (appointmentId: string): Promise<any> => {
  return axios.delete(`/consults/${appointmentId}`)
}

export function useDeleteAppointment() {
  const queryClient = useQueryClient()
  return useMutation(deleteAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries('consults')
      toast.success('Consulta removida com sucesso!')
    },
    onError: (error: unknown) => {
      console.error(error)
      toast.error('Não foi possível remover a consulta!')
    }
  })
}
