import axios, { AxiosError } from 'axios'
import { GetServerSidePropsContext, PreviewData } from 'next'
import Router from 'next/router'
import { API_URL } from '../constants'
import { NextApiRequest, NextApiResponse } from "next";
import { ParsedUrlQuery } from 'querystring';
import { setTokenCookies } from '../../pages/api/auth/utils';

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
let subscribers: ((token: string) => any)[] = [];

const onAccessTokenFetched = (token: string) => {
    subscribers.forEach((callback) => callback(token))
}

const addSubscriber = (callback: (token: string) => any) => {
    subscribers.push(callback)
}

const refreshToken = async (error: AxiosError) => {
    try {

        let { response } = error

        console.log({ 'status': response.status })

        const retryOriginalRequest = () => new Promise(resolve => {
            addSubscriber((token: string) => {
                console.log('SUBSCRIBER ADDED')
                response!.config.headers['Authorization'] = `Bearer ${token}`
                console.log('original request config',response.config)
                resolve(axios(response!.config))
            })
        })

        if (!fetchingToken) {
            fetchingToken = true

            console.log('refreshTokenContext.req.cookies', context.req.cookies)

            const { data } = await httpClient.post(
                `${API_URL}/token/refresh/`,
                { refresh: context?.req?.cookies?.refresh }
            )

            console.log('refreshedTokens', data)

            onAccessTokenFetched(data.access)
        }
        return retryOriginalRequest
    } catch (error) {
        return Promise.reject(error.response.data)
        console.log(error.response.data)
    } finally {
        fetchingToken = false
    }

}