import { useQuery } from "react-query"
import { axios } from "../../../lib/axios"

export const loadPatients = (data: any): Promise<any> => {
    return axios.get('/patients', {
        params: {
            ...data
        }
    })
}

export function useLoadPatients(query: any) {
    return useQuery(['patients', query], () => loadPatients(query), {
        keepPreviousData: true
    })
}
