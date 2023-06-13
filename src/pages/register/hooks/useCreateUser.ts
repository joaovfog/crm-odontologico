import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axios } from '../../../lib/axios'

const createUser = (data: any): Promise<any> => {
  console.log(data)
  return axios.post(`register`, data)
}

export function useCreateUser() {
  const navigate = useNavigate()

  return useMutation(createUser, {
    onSuccess: () => {
      toast.success('Usuário cadastrado com sucesso!')
      navigate('/login')
    },
    onError: (error: unknown) => {
      console.log(error)
      toast.error('Não foi possível cadastrar o usuário')
    }
  })
}
