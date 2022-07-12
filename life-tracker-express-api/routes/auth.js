import express from 'express';
import { User } from '../models/user.js';
import { createUserJwt } from "../utils/tokens.js"
import { requireAuthenticatedUser } from "../middleware/security.js"

const router = express.Router()


router.post('/login', async(req,res, next) => {
    try{
        //take email and passwords and attempt to authenticate
        const user = await User.login(req.body);
        const token = createUserJwt(user);
        return res.status(200).json({ user, token });
    }
    catch(err) {
        res.status(401).send(err)
        next(err)
    }
})

router.post('/register', async(req,res, next) => {
    try{
        /*take user email, password, rsvp status, and number of guests 
            and creat a new user in database */
        const user = await User.register(req.body);
        const token = createUserJwt(user);
        return res.status(201).json({ user, token });
    }
    catch(err) {
        res.status(400).send(err)
        next(err)
    }
})

router.get('/me', requireAuthenticatedUser , async(req,res,next) => {
    try {
        const { email } = res.locals.user
        const user = await User.fetchUserByEmail(email)

        // need function that gets all feed data

        const publicUser = await User.makePublicUser(user)
        return res.status(200).json({ user: publicUser})
    }
    catch(error) {
        next(error)
    }
})

export default router;