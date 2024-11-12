import { HandleApiRespErr } from '../utils/HandleApiRespErr';
import apiClient from './apiClient'

const apiKey = process.env.REACT_APP_API_KEY;

export const generateNewRequestToken = new Promise(async(resolve, reject)=>{
    try {
        const response = await apiClient.get(`/authentication/token/new?api_key=${apiKey}`);
        resolve(response?.data?.request_token)
    } catch (error) {
        HandleApiRespErr(error)
        reject(error)
    }
})

export const createSession = async(requestToken)=>{
    try {
        const res =  await apiClient.post('/authentication/session/new',{
            request_token: requestToken
        })

        return res;
        
    } catch (error) {
        HandleApiRespErr(error)
    }
}

// User details
export const getUserDetails = async(sessionId) => {
    try{
        const dataInform =  await apiClient.get(`/account?api_key=${apiKey}&session_id=${sessionId}`)
        return dataInform.results
    }catch(err){
        HandleApiRespErr(err)
    }
}

// Popular movies

export const getPopularMovies = async()=>{
    return await apiClient.get(`/movie/popular?api_key=${apiKey}`)
}

// trending 
export const getTrending = async(typeOf)=>{
    return await apiClient.get(`/trending/${typeOf}/week?api_key=${apiKey}`)
}

// get trending tvShows
export const getTrendingTvShows = async()=>{
    return await apiClient.get(`/trending/tv/week?api_key=${apiKey}`)
}

// get trending tvShows
export const getTrendingMovies = async()=>{
    return await apiClient.get(`/trending/movie/week?api_key=${apiKey}`)
}


// get movie details

export const getMovieDetail = async( id )=>{
    return await apiClient.get(`/movie/${id}?api_key=${apiKey}`)
}

// get tv detail
export const getTvDetail = async( id )=>{
    return await apiClient.get(`/tv/${id}?api_key=${apiKey}`)
}

// search
export const findAll = async( query ) =>{
    return await apiClient.get(`/search/multi?api_key=${apiKey}&query=${query}`)
} 

//search tv
export const findTv = async(query) =>{
    return await apiClient.get(`/search/tv?api_key=${apiKey}&query=${query}`)
} 


//search movie
export const findMovie = async(query) =>{
    return await apiClient.get(`/search/tv?api_key=${apiKey}&query=${query}`)
} 

// 
export const getFavoriteTv = async(typeOf)=>{
    return await apiClient.get(`/account/21575738/favorite/${typeOf}?api_key=${apiKey}&session_id=bfdde5805050f19ecbc44cb6698bd902ded943c7`)
}

// 
export const getFavorites = async(typeOf)=>{
    return await apiClient.get(`/account/21575738/favorite/${typeOf}?api_key=${apiKey}&session_id=bfdde5805050f19ecbc44cb6698bd902ded943c7`)
}

// watchList
export const getWatchList = async(typeOf)=>{
    return await apiClient.get(`/account/21575738/watchlist/${typeOf}?api_key=${apiKey}&session_id=bfdde5805050f19ecbc44cb6698bd902ded943c7`)
}