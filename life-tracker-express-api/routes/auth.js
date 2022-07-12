import express from 'express';
import { User } from '../models/user.js';

const router = express.Router()

router.get('/', async(req,res,next) => {
    try{
        res.status(200).json('auth route works')
    }
    catch (err) {
        next(error)
    }
})

router.post('/login', async(req,res, next) => {
    try{
        //take email and passwords and attempt to authenticate
        const user = await User.login(req.body);
        return res.status(200).json({ user });
    }
    catch(err) {
        next(err)
    }
})

router.post('/register', async(req,res, next) => {
    try{
        /*take user email, password, rsvp status, and number of guests 
            and creat a new user in database */
        const user = await User.register(req.body);
        return res.status(201).json({ user });
    }
    catch(err) {
        res.status(400).send(err)
        next(err)
    }
})

export default router;