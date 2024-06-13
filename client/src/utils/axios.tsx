import axios, { AxiosInstance } from "axios";


const URL = 'https://amalitech-video-app.onrender.com/api/'
// const URL = 'http://127.0.0.1:8000/api/'

const instance: AxiosInstance = axios.create({
    baseURL: URL,

})

export default instance