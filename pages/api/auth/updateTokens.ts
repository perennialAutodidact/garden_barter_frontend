/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { API_URL } from "../../../common/constants";
import cookie from "cookie";
import { deleteTokenCookies, setTokenCookies, updateTokens, verifyAccessToken, requestAccessToken } from "./utils";

export default async (req, res) => {
    const cookies = cookie.parse(req.headers.cookie || "");
    const refresh = cookies.refresh || '';
    const access = cookies.access || '';

    return res.status(200).json({message: 'success'})
    // try {
    //     const verifyAccessTokenRes = await verifyAccessToken(access)
    //     return res.status(200).json(verifyAccessTokenRes.data)
    // } catch (error) {
    //     try {
    //         const requestAccessTokenRes = await requestAccessToken(refresh)
    //         const { access: updatedAccessToken, refresh: updatedRefreshToken } = requestAccessTokenRes.data
    //         res = setTokenCookies(res, updatedAccessToken, updatedRefreshToken)
    //         return res.status(200).json({ 'message': 'Tokens updated!' })
    //     } catch (requestTokensError) {
    //         res = setTokenCookies(res, '', '')
    //         return res.status(requestTokensError.response?.status || 500).json({ 'error': requestTokensError.response?.data || requestTokensError })
    //     }
    // }
};