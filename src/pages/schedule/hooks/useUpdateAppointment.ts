import { useQueryClient, useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { axios } from '../../../lib/axios'

const updateAppointment = (data: any): Promise<any> => {
  console.log(data)
  return axios.put(`consults/${data.appointmentId}`, data)
}

export function useUpdateAppointment() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation(updateAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries('consults')
      toast.success('Consulta atualizada com sucesso!')
      navigate('/consults')
    },
    onError: (error: unknown) => {
      console.error(error)
      toast.error('Não foi possível atualizar a consulta')
    }
  })
}
