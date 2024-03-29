import axios from "axios";
import { API_URL } from "../../../common/constants";
import { setTokenCookies } from "./utils";

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
            const { access, refresh } = apiRes.data
            res = setTokenCookies(res, access, refresh)
            
            return res.status(200).json({
                message: 'Logged in successfully!'
            })
            
        } catch (error) {
            console.log(error)
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
