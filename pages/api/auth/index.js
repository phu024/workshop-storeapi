import { db, query } from "../../../lib/db";
import Jwt from "jsonwebtoken";
const secretKEY = "MySecretKey"
export default async function handler(req, res) {
    if (req.method == "POST") {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: { code: 400, message: 'Missing email and password' } })
        }
        const results = await query("SELECT * FROM user WHERE email=? AND password=?", [email, password]);
        console.log(results);
        const data = results.data[0];
        console.log(data);
        if (data) {
            const payload = {
                id: data.id,
                email: data.email,
                name: data.name,
                role: data.role
            }
            Jwt.sign(payload, secretKEY, { expiresIn: "1d" }, (err, token) => {
                return res.status(200).json({ status: { code: 200, message: "Authorized", data: payload, token } })
            })
        } else {
            res.status(401).json({ status: { code: 401, message: "UnAuthorized" } })
        }
    } else {
        res.status(405).json({ status: { code: 405, message: "Method Not Allowed" } })
    }
}