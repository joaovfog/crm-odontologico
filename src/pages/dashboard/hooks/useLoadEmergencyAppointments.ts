import { useQuery } from "react-query"
import { axios } from "../../../lib/axios"

export const loadEmergencyAppointments = (data: any): Promise<any> => {
    return axios.get('/emergencyAppointments', {
        params: {
            ...data
        }
    })
}

export function useLoadEmergencyAppointments(query: any) {
    return useQuery(['emergencyAppointments', query], () => loadEmergencyAppointments(query), {
        keepPreviousData: true
    })
}
