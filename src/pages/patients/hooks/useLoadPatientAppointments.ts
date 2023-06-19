import { useQuery } from "react-query"
import { axios } from "../../../lib/axios"

export const loadPatientAppointments = (id: string): Promise<any> => {
    return axios.get(`/patientAppointments/${id}`)
}

export function useLoadPatientAppointments(query: any) {
    const { data, error, isLoading, isFetching, isPreviousData } = useQuery(
        ['consults', query],
        () => loadPatientAppointments(query)
    )

    return { data, error, isLoading, isFetching, isPreviousData }
}
