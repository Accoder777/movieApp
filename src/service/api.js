const apiKey = process.env.REACT_APP_API_KEY
const baseUrl = process.env.REACT_APP_BASE_URL


const movieUrl ={
    getTrendingMovie: (typeOf)=> `/trending/${typeOf}/week?api_key=${apiKey}`,
    getMovieId: (id) => `/movie/${id}?api_key=${apiKey}`
}

export { baseUrl,movieUrl };