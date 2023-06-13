import { useQuery } from "react-query"
import { axios } from "../../../lib/axios"

export const loadAppointment = (id: string): Promise<any> => {
    return axios.get(`/consults/${id}`)
}

export function useLoadAppointment(query: any) {
    const { data, error, isLoading, isFetching, isPreviousData } = useQuery(
        ['consults', query],
        () => loadAppointment(query),
        {
            enabled: !!query
        }
    )

    return { data, error, isLoading, isFetching, isPreviousData }
}
