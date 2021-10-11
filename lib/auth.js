import jwt from "jsonwebtoken";

const APIKEY = "3d7d052a031e864ee9c1b04b5a4d0f11"
const secretKEY = "MySecretKey"

export function checkapiKey(apikey) {
    if (apikey == APIKEY) {
        return true
    } else {
        return false
    }
}
export function verifyToken(token) {
    const jwtToken = token.split(' ')[1];
    try {
        return jwt.verify(jwtToken, secretKEY)
    } catch {
        return false
    }
}