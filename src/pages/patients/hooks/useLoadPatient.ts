import { useQuery } from "react-query"
import { axios } from "../../../lib/axios"

export const loadPatient = (id: string): Promise<any> => {
    return axios.get(`/patients/${id}`)
}

export function useLoadPatient(query: any) {
    const { data, error, isLoading, isFetching, isPreviousData } = useQuery(
        ['patients', query],
        () => loadPatient(query)
    )

    return { data, error, isLoading, isFetching, isPreviousData }
}
