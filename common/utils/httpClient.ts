import axios, {AxiosError} from 'axios'
import { GetServerSidePropsContext } from 'next'
import Router from 'next/router'

const isServer = () => typeof window === "undefined"

let context = <GetServerSidePropsContext>{}
const baseURL = process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_API_URL_DEVELOPEMENT
    : process.env.NEXT_PUBLIC_API_URL_PRODUCTION

export const httpClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // to send cookies
})

httpClient.interceptors.request.use((config)=>{
    
    
    return config
})