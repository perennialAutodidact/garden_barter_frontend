import axios from "axios";
import { API_URL } from "../../../common/constants";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const apiRes = await axios.post(API_URL + "/register/", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      return res.status(201).json({ message: `Account registered!` });
    } catch (error) {
      if (error.response) {
        return res.status(error.response.status).json({
          errors: error.response.data.errors
        });
      } else {
        return res.status(500).json({
          errors: ["Something went wrong trying to register."]
        });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
