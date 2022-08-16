import axios from "axios";
import { API_URL } from "../../../common/constants";

export const updateTokens = async ({ accessToken, refreshToken }) => {
  try {
    return await verifyAccessToken(accessToken);
  } catch (error) {
    try {
      return await requestAccessToken(refreshToken);
    } catch (error) {
      return error.response.data;
    }
  }
};

const verifyAccessToken = async (accessToken: string) =>
  axios.post(`${API_URL}/token/verify/`, {
    token: accessToken,
  });

const requestAccessToken = async (refreshToken: string) =>
  axios.post(`${API_URL}/token/refresh/`, {
    refresh: refreshToken,
  });
