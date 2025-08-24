import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
    resumeImg: [String],
    jobTitle: String,
    companyName: String,
    feedback: Object,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

export const UserResume = mongoose.model("UserResume", userDataSchema);