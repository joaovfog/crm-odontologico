import { useQuery } from "react-query"
import { axios } from "../../lib/axios"

export const loadUser = (id: string): Promise<any> => {
    return axios.get(`/users/${id}`)
}

export function useLoadUser(query: any) {
    const { data, error, isLoading, isFetching, isPreviousData } = useQuery(
        ['users', query],
        () => loadUser(query)
    )

    return { data, error, isLoading, isFetching, isPreviousData }
}
