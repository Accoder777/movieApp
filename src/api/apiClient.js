import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_URL;
const RequestToken = process.env.REACT_APP_ACCESS_TOKEN

const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${RequestToken}`
    }
})


export default apiClient;