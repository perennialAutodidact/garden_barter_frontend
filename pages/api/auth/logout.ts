import cookie from "cookie";
import { deleteTokenCookies } from "./utils";
export default async (req, res) => {
  if (req.method === "POST") {
    res = deleteTokenCookies(res)

    return res.status(200).json({message:'Logged out successfully.'})

  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      error: `Method ${req.method} now allowed`
    });
  }
};
