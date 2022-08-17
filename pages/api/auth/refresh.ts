import axios from "axios";
import { API_URL } from "../../../common/constants";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const refresh = cookies.refresh ?? false;

    if (!refresh) {
      return res.status(401).json({
        errors: [`Unauthorized. Missing refresh token.`]
      });
    }

    try {
      const apiRes = await axios.post(
        `${API_URL}/token/refresh/`,
        { refresh },
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

      return res
        .status(200)
        .json({ message: "Tokens refreshed successfully!" });
    } catch (error) {
    //   console.log(error.response)
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
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      error: `Method ${req.method} now allowed`
    });
  }
};
