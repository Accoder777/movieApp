import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiKey = process.env.REACT_APP_API_KEY
const baseUrl = process.env.REACT_APP_BASE_URL

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, {getState})=>{
        headers.set('Accept', 'application/json');

        return headers;
    },
    credentials: 'same-origin'
});

export const apiController = createApi({
    reducerPath: "apiSlice",
    baseQuery,
    endpoints: (builder)=>({})
});