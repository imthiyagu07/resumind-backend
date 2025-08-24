import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import { router } from './routes/authRoutes.js'
import { resumeRouter } from './routes/resumeRoutes.js'
import { userRouter } from './routes/userRouter.js'

import dotenv from 'dotenv';
dotenv.config()

const app = express()
app.use(express.json({limit: "20mb"}));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

//DB Connection
connectDB()

//auth routes (signup, login)
app.use('/api/auth', router)

// routes to store the resume
app.use('/api', resumeRouter)

// to get user data
app.use('/api', userRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

