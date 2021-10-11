import { query } from "../../../lib/db";
import { verifyToken } from "../../../lib/auth";


export default async function handler(req, res) {
    if (req.method == "GET") {
        const { authorization } = req.headers;
        const { cartid } = req.query;
        console.log(req.headers);
        const verifiedToken = verifyToken(authorization);
        if (verifiedToken && verifiedToken.role === "admin") {
            const results = await query("SELECT * FROM cart WHERE id=?", cartid)
            res.status(results.status.code).json(results);
        } else if (verifiedToken && verifiedToken.role === "user") {
            const results = await query("SELECT * FROM cart WHERE id=? AND userid=?", [cartid, verifiedToken.id])
            res.status(results.status.code).json(results);
        } else {
            res.status(401).json({ status: { code: 401, message: 'Unauthorized' } })
        }
    } else if (req.method == "PUT") {
        const { authorization } = req.headers;
        const { cartid } = req.query;
        const { products } = req.body;
        console.log(req.headers);
        const verifiedToken = verifyToken(authorization);
        if (verifiedToken && verifiedToken.role === "admin") {
            const results = await query("UPDATE cart SET products=? WHERE id=?", [JSON.stringify(products), cartid])
            res.status(results.status.code).json(results);
        } else if (verifiedToken && verifiedToken.role === "user") {
            const results = await query("UPDATE cart SET products=? WHERE id=? AND userid=?", [JSON.stringify(products), cartid, verifiedToken.id])
            res.status(results.status.code).json(results);
        } else {
            res.status(401).json({ status: { code: 401, message: 'Unauthorized' } })
        }
    } else if (req.method == "DELETE") {
        const { authorization } = req.headers;
        const { cartid } = req.query;
        console.log(req.headers);
        const verifiedToken = verifyToken(authorization);
        if (verifiedToken && verifiedToken.role === "admin") {
            const results = await query("DELETE FROM cart WHERE id=?", cartid)
            res.status(results.status.code).json(results);
        } else if (verifiedToken && verifiedToken.role === "user") {
            const results = await query("DELETE FROM cart WHERE id=? AND userid=?", [cartid, verifiedToken.id])
            res.status(results.status.code).json(results);
        } else {
            res.status(401).json({ status: { code: 401, message: 'Unauthorized' } })
        }
    }
}