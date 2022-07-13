import express from "express";
import { Exercises } from "../models/exercises.js";
import { requireAuthenticatedUser } from "../middleware/security.js"

const router = express.Router()

router.get('/', async (req,res,next) => {
    try {
        const user = res.locals.user
        let exerciseList = await Exercises.listUserExerciseEntries(user);
        return res.status(200).json({
            exercises: exerciseList
        })
    }
    catch(error) {
        next(error)
    }
})

router.post('/', async (req,res,next) => {
    try {
        const user = res.locals.user
        Exercises.createUserExerciseEntry({user, exercise: req.body})
        return res.status(201)
    }
    catch(error) {
        next(error)
    }
})

export default router;