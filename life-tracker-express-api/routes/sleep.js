import express from 'express';
import { Sleep } from '../models/sleep.js';
import { requireAuthenticatedUser } from "../middleware/security.js"

const router = express.Router()


router.get('/', requireAuthenticatedUser, async (req,res,next) => {
    try {
        const user = res.locals.user
        let sleepList = await Sleep.listUserSleepEntries(user);
        return res.status(200).json({
            sleep: sleepList
        })
    }
    catch(error) {
        next(error)
    }
})


router.post('/', requireAuthenticatedUser, async (req,res,next) => {
    try {
        const user = res.locals.user
        Sleep.createUserSleepEntry({user, sleep: req.body})
        return res.status(201)
    }
    catch(error) {
        next(error)
    }
})

export default router;