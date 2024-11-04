import { HandleApiRespErr } from '../utils/HandleApiRespErr';
import apiClient from './apiCleint'

const apiKey = process.env.REACT_APP_API_KEY

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

// get movie details

export const getMovieDetail = async( id )=>{
    return await apiClient.get(`/movie/${id}?api_key=${apiKey}`)
}