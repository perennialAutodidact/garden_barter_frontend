import axios from "axios";
import { API_URL } from "../../../common/constants";
import { httpClient, setHttpClientContext } from "../../../common/utils/httpClient";
import cookie from 'cookie'
import { setTokenCookies } from "./utils";

export default async (req, res) => {
  if (req.method === "GET") {
    setHttpClientContext({req,res})

    try {
        const apiRes = await httpClient.get(
            `${API_URL}/user/`,
            {headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${access}`
            }}
        )
        // console.log('fetchuserresponse', apiRes.headers['set-cookie'])
        // res.setHeader('Set-Cookie', apiRes.headers['set-cookie'])

            // console.log(cookie.parse(apiRes.headers['set-cookie'][0]))
            // cookie.serialize(cookie.parse(apiRes.headers["set-cookie"][0]  ))

        return res.status(200).json(apiRes.data)
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({
              errors: error.response.data
            });
          } else {
            console.log('fetch user data error', error)
            return res.status(500).json({
              errors: ["Something went wrong trying to fetch user data."]
            });
          }
    }

  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      error: `Method ${req.method} now allowed`
    });
  }
};
