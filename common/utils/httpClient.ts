import axios, { AxiosError, AxiosResponse } from 'axios'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { API_URL } from '../constants'
import { NextApiRequest, NextApiResponse } from "next";
import { setTokenCookies } from '../../pages/api/auth/utils';

const isServer = () => typeof window === "undefined"

type ClientSideContext = {
    req: NextApiRequest;
    res: NextApiResponse
}


export type HttpContext = GetServerSidePropsContext | ClientSideContext 

let context = <HttpContext>{}; 


const baseURL = API_URL

export const httpClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // to send cookies
})

export const setHttpClientContext = (_context:HttpContext) => {
    context = _context
}

httpClient.interceptors.request.use((config) => {
    const accessToken = context?.req?.cookies?.access

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    if (isServer() && context?.req?.cookies) {
        // something on the server side with the token?
    }
    
    return config
})

httpClient.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        if (
            error.response?.status === 401 &&
            !error.response?.config?.url?.includes("token/refresh") &&
            !error.response?.config?.url?.includes("login")
        ) {
            return refreshToken(error)
        }
        return Promise.reject(error)
    }
)

let fetchingToken = false;
let subscribers: ((access:string, refresh:string) => any)[] = [];

const onTokensFetched = (access: string, refresh: string) => {
    context.res = setTokenCookies(context.res, access, refresh)
    subscribers.forEach((callback) => callback(access, refresh))
}

const addSubscriber = (callback: (access:string, refresh:string) => any) => {
    subscribers.push(callback)
}

const refreshToken = async (error: AxiosError) => {
    try {
        let { response } = error

        const retryOriginalRequest = () => {
            return new Promise(resolve => {

            addSubscriber((access:string, refresh:string) => {
                response!.config.headers['Authorization'] = `Bearer ${access}`
                resolve(axios(response!.config))
            })
        })}

        if (!fetchingToken) {
            fetchingToken = true
            // console.log('cookies',context.req)
            const {data} = await httpClient.post(
                `${API_URL}/token/refresh/`,
                { refresh: context?.req?.cookies?.refresh }
            )

            onTokensFetched(data.access, data.refresh)
        }
        return retryOriginalRequest()
    } catch (error) {
        return Promise.reject(error)
    } finally {
        fetchingToken = false
    }

}
