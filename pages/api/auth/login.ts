import axios from "axios";
import { API_URL } from "../../../common/constants";
import { setTokenCookies } from "./utils";
import { httpClient, setHttpClientContext } from "../../../common/utils/httpClient";
const loginRoute = async (req, res) => {
    if (req.method === "POST") {
        setHttpClientContext({req,res})
        const { email, password } = req.body;
        try {
            const apiRes = await httpClient.post(
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
            
                // console.log(apiRes.headers["set-cookie"])

            return res.status(200).json({
                message: 'Logged in successfully!'
            })
            
        } catch (error) {
            if (error.response) {
                console.log('login error',error.response.data)
                return res.status(error.response.status).json({
                    errors: [error.response.data.detail]
                });
            } else {
                console.log('login error', error)
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

export default loginRoute