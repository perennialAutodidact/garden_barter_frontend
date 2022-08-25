import axios from "axios";
import { API_URL } from "../../../../common/constants";
import cookie from "cookie";

const findConversationRoute = async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie || "");
    const access = cookies.access || false;

    if (!access) {
      return res.status(401).json({
        errors: ["Unauthorized"],
      });
    }

    try {
      const apiRes = await axios.get(`${API_URL}/inbox/conversations/find/`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        params: req.query,
      });

      return res.status(200).json(apiRes.data);
    } catch (error) {
      return error.response
        ? res.status(error.response.status).json({
            errors: error.response.data.message,
          })
        : res.status(500).json({
            errors: [
              "Oops! An error occured when trying to create a barter.",
              "Please try again later or contact us.",
            ],
          });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res
      .status(405)
      .json({ errors: [`Method ${req.method} not allowed`] });
  }
};
export default findConversationRoute;
