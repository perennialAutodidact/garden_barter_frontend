import axios from "axios";
import { API_URL } from "../../../../common/constants";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    if (!access) {
      return res.status(401).json({
        errors: ["Unauthorized"]
      });
    }

    try {
      const apiRes = await axios.get(`${API_URL}/inbox/conversations/find/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`
        },
        params: req.query
      });

      return res.status(200).json(apiRes.data);
      //   return res.status(200).json({ convoId: conversationId });
    } catch (error) {
      error.errors;
      if (error.response) {
        return res.status(error.response.status).json({
          errors: error.response.data.errors.map(
            (messageData) => messageData.message
          )
        });
      }
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res
      .status(405)
      .json({ errors: [`Method ${req.method} not allowed`] });
  }
};
