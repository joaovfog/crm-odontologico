import { useQueryClient, useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { axios } from '../../../lib/axios'

const updatePatient = (data: any): Promise<any> => {
  console.log(data)
  return axios.put(`patients/${data.patientId}`, data)
}

export function useUpdatePatient() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation(updatePatient, {
    onSuccess: () => {
      queryClient.invalidateQueries('patients')
      toast.success('Paciente atualizado com sucesso!')
      navigate('/patients')
    },
    onError: (error: unknown) => {
      console.error(error)
      toast.error('Não foi possível atualizar o paciente')
    }
  })
}
