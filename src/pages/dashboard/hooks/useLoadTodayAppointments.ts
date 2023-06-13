import { useQuery } from "react-query"
import { axios } from "../../../lib/axios"

export const loadTodayAppointments = (data: any): Promise<any> => {
    return axios.get('/todayAppointments', {
        params: {
            ...data
        }
    })
}

export function useLoadTodayAppointments(query: any) {
    return useQuery(['todayAppointments', query], () => loadTodayAppointments(query), {
        keepPreviousData: true
    })
}
