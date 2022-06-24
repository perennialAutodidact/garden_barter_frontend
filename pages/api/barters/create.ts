import axios from "axios";
import { API_URL } from "../../../constants";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    if (!access) {
      return res.status(401).json({
        errors: ["Unauthorized"]
      });
    }

    try {
      const apiRes = await axios.post(
        `${API_URL}/barters/create/`,
        {
          formData: req.body.formData,
          user: req.body.user
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`
          }
        }
      );

      return res.status(200).json(apiRes.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        return res.status(error.response.status).json({
          errors: error.response.data.errors.map(
            (messageData) => messageData.message
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
    // call API with barter data
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      error: `Method ${req.method} now allowed`
    });
  }
};
