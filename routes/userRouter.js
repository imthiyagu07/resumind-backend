import express from 'express'
import { User } from '../models/User.js'
import { protect } from '../authMiddleware.js'

export const userRouter = express.Router()

userRouter.get('/user', protect, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user})
        if(!user) return res.status(404).json({message: "User not found"})
        res.json({name: user.name, email: user.email})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})