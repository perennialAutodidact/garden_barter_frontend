import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../../common/constants";
import cookie from "cookie";
import { NextApiResponse } from "next";
import { ServerResponse } from "http";

export const updateTokens = async (accessToken, refreshToken) => {};

export async function verifyAccessToken(accessToken: string) {
  return await axios.post(`${API_URL}/token/verify/`, {
    token: accessToken,
  });
}

export async function requestAccessToken(refreshToken: string) {
  return await axios.post(`${API_URL}/token/refresh/`, {
    refresh: refreshToken,
  });
}

interface ResponseData {
  message?: string;
  errors?: string[];
}
export const setTokenCookies = (
  res: NextApiResponse<ResponseData> | ServerResponse | AxiosResponse,
  access: string,
  refresh: string
) => {
  let headerSetter;
  if ("setHeader" in res) {
    headerSetter = res.setHeader;
  } else {
    headerSetter = (res, headerName, value) =>
      (res.headers[headerName] = value);
  }
  headerSetter("Set-Cookie", [
    cookie.serialize("access", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/api/",
    }),
    cookie.serialize("refresh", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/api/",
    }),
  ]);
  headerSetter("Set-Cookie", [
    cookie.serialize("access", access, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 30,
      sameSite: "strict",
      path: "/api/",
    }),
    cookie.serialize("refresh", refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
      path: "/api/",
    }),
  ]);
  return res;
};

export const deleteTokenCookies = (res: NextApiResponse<ResponseData>) => {
  res.setHeader("Set-Cookie", [
    cookie.serialize("access", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/api/",
    }),
    cookie.serialize("refresh", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/api/",
    }),
  ]);
  return res;
};
