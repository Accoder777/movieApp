import { apiController } from "./apiControl";

const apiKey = process.env.REACT_APP_API_KEY

const movieApiController = apiController.injectEndpoints({
    endpoints: (builder) =>({
        // Trending 
        getTrendingMovie: builder.query({
            query: (typeOf)=> `/trending/${typeOf}/week?api_key=${apiKey}`
        }),
        // Get By Id
        getMovieId: builder.query({
            query: (id) => `/movie/${id}?api_key=${apiKey}`
        })  
    })
})

export const {useGetTrendingMovieQuery,useGetMovieIdQuery} = movieApiController