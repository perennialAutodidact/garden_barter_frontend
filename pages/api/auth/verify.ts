import axios from "axios";
import { API_URL } from "../../../constants";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const tokenType = req.body.tokenType;
    const token = cookies[tokenType] ?? false;

    if (!token) {
      return res.status(403).json({
        errors: [`Unauthorized. Missing ${tokenType} token.`]
      });
    }

    try {
      const apiRes = await axios.post(
        `${API_URL}/token/verify/`,
        { token },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
    } catch (error) {
      if (error.response) {
        return res.status(error.response.status).json({
          errors: [error.response.data.detail]
        });
      } else {
        return res.status(500).json({
          errors: ["Something went wrong trying to register."]
        });
      }
    }

    return res.status(200).json({
      token
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ errors: [`Method ${req.method} not allowed`] });
  }
};
