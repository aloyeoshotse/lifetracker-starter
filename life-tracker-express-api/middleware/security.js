import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config.js"
import { UnauthorizedError } from "../utils/errors.js"

const jwtFrom = ({ headers }) => {
    if (headers.authorization) {
        const [scheme, token] = headers.authorization.split(" ");
        if (scheme.trim() == "Bearer") {
            return token
        }
    }

    return undefined
}

export const extractUserFromJwt = (req,res,next) => {
    try {
        const token = jwtFrom(req)
        if (token) {
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next()
    }
    catch(error) {
        console.log(error)
        return next()
    }
}

export const requireAuthenticatedUser = (req,res,next) => {
    try {
        const user = res.locals.user
        if (!user.email) {
            throw new UnauthorizedError()
        }
        return next()
    }
    catch(error) {
        return next(error)
    }
}