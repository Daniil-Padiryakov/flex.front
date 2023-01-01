// @ts-nocheck
import { IProject } from '../domain/IProject'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5010',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
        },
    }),
    tagTypes: ['Project'],
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => '/project',
            providesTags: (result) => ['Project'],
        }),
        createProject: builder.mutation<IProject, IProject>({
            query: (project: IProject) => ({
                url: '/project',
                method: 'POST',
                body: project,
            }),
            invalidatesTags: ['Project'],
        }),
    }),
})

export const { useGetProjectsQuery, useCreateProjectMutation } = projectApi
// export const {useFetchAllProjects} = projectApi.endpoints.fetchAllProjects.useQuery;
