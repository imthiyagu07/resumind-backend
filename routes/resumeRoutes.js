import express from 'express'
import { UserResume } from '../models/UserResume.js'
import { protect } from '../authMiddleware.js'

export const resumeRouter = express.Router();

resumeRouter.post("/resume", protect, async (req, res) => {
    try {
        const {resumeImg, jobTitle, companyName, feedback} = req.body

        const newResume = new UserResume({
            resumeImg,
            jobTitle,
            companyName,
            feedback,
            userId: req.user
        });

        const savedResume = await newResume.save();
        res.status(201).json(savedResume);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

resumeRouter.get("/resume/:id", protect, async (req, res) => {
    try {
        const {id} = req.params;
        const userResume = await UserResume.findOne({_id: id, userId: req.user})
        if(!userResume){
            return res.status(404).json({message: "Resume not found"});
        }
        res.json(userResume);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

resumeRouter.get("/resume", protect, async (req, res) => {
    try {
        const resumes = await UserResume.find({userId: req.user});
        res.json(resumes);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

resumeRouter.delete('/delete/:id', protect, async (req, res) => {
    try {
        const {id} = req.params
        const resumes = await UserResume.deleteOne({_id: id, userId: req.user})
        res.json(resumes)
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})