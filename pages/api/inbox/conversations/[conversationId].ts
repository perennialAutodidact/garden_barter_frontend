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
      const conversationId = req.data.conversationId;
      const apiRes = await axios.get(
        `${API_URL}/inbox/conversations/${conversationId}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`
          }
        }
      );

      return res.status(200).json({ convoId: conversationId });
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({
              errors: error.response.data.errors.map(
                (conversationData) => conversationData.message
              )
            });
          } else {
            return res.status(500).json({
              errors: [
                "Oops! An error occured when trying to create a barter.",
                "Please try again later or contact us."
              ]
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
