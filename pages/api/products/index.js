import { query } from "../../../lib/db";

export default async function handler(req, res) {
    if (req.method == "GET") {
        const results = await query("SELECT * FROM product")
        res.status(results.status.code).json(results);
    }
}