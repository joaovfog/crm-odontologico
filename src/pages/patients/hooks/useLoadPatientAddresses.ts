import { useQuery } from "react-query"
import { axios } from "../../../lib/axios"

export const loadPatientAddresses = (id: string): Promise<any> => {
    return axios.get(`/addresses/${id}`)
}

export function useLoadPatientAddresses(query: any) {
    const { data, error, isLoading, isFetching, isPreviousData } = useQuery(
        ['patientAddresses', query],
        () => loadPatientAddresses(query)
    )

    return { data, error, isLoading, isFetching, isPreviousData }
}
