import express, { json } from 'express';
import { Nutrition } from '../models/nutrition.js';
import { requireAuthenticatedUser } from "../middleware/security.js"

const router = express.Router()


router.get('/', requireAuthenticatedUser, async (req,res,next) => {
    try {
        const user = res.locals.user
        let nutritionList = await Nutrition.listUserNutritionEntries(user);
        return res.status(200).json({
            nutrition: nutritionList
        })
    }
    catch(error) {
        next(error)
    }
})

router.post('/', requireAuthenticatedUser , async(req,res,next) => {
    try {
        const user = res.locals.user
        Nutrition.createUserNutritionEntry({user, nutrition: req.body})
        return res.status(201)
    }
    catch(error) {
        next(error)
    }
})

export default router;