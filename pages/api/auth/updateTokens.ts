import axios from "axios";
import { API_URL } from "../../../common/constants";
import cookie from "cookie";
import { updateTokens } from "./utils";

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? "");
  const { access, refresh } = cookies ?? false;

  try {
    const updateTokenResponse = await updateTokens({
      accessToken: access,
      refreshToken: refresh,
    });
    return res.status(200).json({ message: "Tokens updated!" });
  } catch (error) {
    error = error.response ? error.response.data : error;
    const status = error.response ? error.response.status : 401;

    return res.status(status).json({ errors: [error] });
  }
};

// export default async (req, res) => {
//   if (req.method === "POST") {
//     const cookies = cookie.parse(req.headers.cookie ?? "");
//     const tokenType = req.body.tokenType;
//     const token = cookies[tokenType] ?? false;

//     if (!token) {
//       return res.status(401).json({
//         errors: [`Unauthorized. Missing ${tokenType} token.`]
//       });
//     }

//     try {
//       const apiRes = await axios.post(
//         `${API_URL}/token/verify/`,
//         { token },
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json"
//           }
//         }
//       );
//     } catch (error) {
//       if (error.response) {
//         return res.status(error.response.status).json({
//           errors: [error.response.data.detail]
//         });
//       } else {
//         return res.status(500).json({
//           errors: [`Something went wrong trying to verify token of type '${tokenType}'.`]
//         });
//       }
//     }

//     return res.status(200).json({
//       token
//     });
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     return res.status(405).json({ errors: [`Method ${req.method} not allowed`] });
//   }
// };
