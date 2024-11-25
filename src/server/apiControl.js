import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL})
const apiKey = process.env.REACT_APP_API_KEY

export const apiController = createApi({
    reducerPath: 'apiControl',
    baseQuery: baseQuery,
    endpoints: (builder) =>({
        getPopularMovies: builder.query({
            query: ()=>`/movie/popular?api_key=${apiKey}`
        }),
        getTrending: builder.query({
            query: (typeOf)=>`/trending/${typeOf}/week?api_key=${apiKey}`
        }),
        getTrendingMovies: builder.query({
            query: ()=>`/trending/movie/week?api_key=${apiKey}`
        })
    })
})

export const { useGetPopularMoviesQuery, useGetTrendingQuery,useGetTrendingMoviesQuery } = apiController