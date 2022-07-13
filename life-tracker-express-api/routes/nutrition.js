import express, { json } from 'express';
import { User } from '../models/user.js';
import { requireAuthenticatedUser } from "../middleware/security.js"

const router = express.Router()

router.get('/', (req,res,next) => {
    res.status(200).json("nutrition route works")
})

router.post('/', requireAuthenticatedUser , async(req,res,next) => {
    try {
        const { email } = res.locals.user
        const user = await User.fetchUserByEmail(email)

        // need function that gets all feed data and returns it (similar to store page)

        const publicUser = await User.makePublicUser(user)
        return res.status(200).json({ user: publicUser})
    }
    catch(error) {
        next(error)
    }
})

export default router;