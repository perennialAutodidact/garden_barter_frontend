import axios from "axios";
import cookie from "cookie";
import { API_URL } from "../../../common/constants";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const apiRes = await axios.post(
        `${API_URL}/token/`,
        JSON.stringify({ email, password }),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );

      res.setHeader("Set-Cookie", [
        cookie.serialize("access", apiRes.data.access, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 30,
          sameSite: "strict",
          path: "/api/"
        }),
        cookie.serialize("refresh", apiRes.data.refresh, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24,
          sameSite: "strict",
          path: "/api/"
        })
      ]);

      return res.status(200).json({
        message: 'Logged in successfully!'
      })
    } catch (error) {
        // console.log(error)
      if (error.response) {
        return res.status(error.response.status).json({
          errors: [error.response.data.detail]
        });
      } else {
        return res.status(500).json({
          errors: ["Something went wrong trying to log in."]
        });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ errors: [`Method ${req.method} not allowed`] });
  }
};
