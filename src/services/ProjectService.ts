import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProject} from "../domain/IProject";

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5010'}),
    endpoints: (builder) => ({
        fetchAllProjects: builder.query({
            query: () => '/project',
        })
    })
})

// export const {useFetchAllProjects} = projectApi.endpoints.fetchAllProjects.useQuery;