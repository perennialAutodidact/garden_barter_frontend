import axios, { AxiosError, AxiosResponse } from 'axios'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { API_URL } from '../constants'
import { NextApiRequest, NextApiResponse } from "next";
import { setTokenCookies } from '../../pages/api/auth/utils';

import cookie from 'cookie'
const isServer = () => typeof window === "undefined"

type ClientSideContext = {
    req: NextApiRequest;
    res: NextApiResponse
}


export type HttpContext = GetServerSidePropsContext | ClientSideContext 

let context = <HttpContext>{}; 


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
    response => {
        // console.log('success:', response.data)
        return response},
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
    console.log('Tokens fetched', {access,refresh})
    subscribers.forEach((callback) => callback(access, refresh))
    // context.res = setTokenCookies(context.res, '1234', 'zbcd')
}

const addSubscriber = (callback: (access:string, refresh:string) => any) => {
    subscribers.push(callback)
}

const refreshToken = async (error: AxiosError) => {
    try {

        let { response } = error

        // console.log({ 'status': response.status })

        const retryOriginalRequest = () => {
            return new Promise(resolve => {

            addSubscriber((access:string, refresh:string) => {
                response!.config.headers['Authorization'] = `Bearer ${access}`
                response!.config['data'] = JSON.stringify({
                    ...response!.config.data,
                   access, refresh 
                })
                // console.log('original request config',response.config)
                
                resolve(axios(response!.config).then(res=>res))
            })
        })}

        if (!fetchingToken) {
            fetchingToken = true

            // console.log('refreshTokenContext.req.cookies', context.req.cookies)

            const res = await httpClient.post(
                `${API_URL}/token/refresh/`,
                { refresh: context?.req?.cookies?.refresh }
            )
            setTokenCookies(res, '', '')
            // console.log('refreshedTokens', data)

            // onTokensFetched(data.access, data.refresh)
        }
        return retryOriginalRequest()
    } catch (error) {
        return Promise.reject(error)
    } finally {
        fetchingToken = false
    }

}
