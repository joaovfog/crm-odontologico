import { useQuery } from "react-query"
import { axios } from "../../../lib/axios"

export const loadAppointments = (data: any): Promise<any> => {
    return axios.get('/consults', {
        params: {
            ...data
        }
    })
}

export function useLoadAppointments(query: any) {
    return useQuery(['consults', query], () => loadAppointments(query), {
        keepPreviousData: true
    })
}
