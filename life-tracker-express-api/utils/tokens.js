import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js"

export const generateToken = (data) => jwt.sign(data, SECRET_KEY, { expiresIn: "24h" })

export const createUserJwt = (user) => {
    const payload = {
        email: user.email,
        isAdmin: user.isAdmin || false
    }

    return generateToken(payload)
}

export const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        return decoded
    }
    catch(error) {
        return {}
    }
}


