import axios from "axios";
import { API_URL } from "../../../common/constants";
import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === "GET") {

    const cookies = cookie.parse(req.headers.cookie || "")
    const access = cookies.access || false

    if(!access){
        return res.status(401).json({
            errors: ['Unauthorized']
        })
    }

    try {
        const apiRes = await axios.get(
            `${API_URL}/user`,
            {headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`
            }}
        )

        return res.status(200).json(apiRes.data)
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({
              errors: error.response.data.messages.map(messageData=>messageData.message)
            });
          } else {
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
