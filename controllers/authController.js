import { User } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { genSalt, hash, compare } from "bcrypt";

export const signup = async (req, res) => {
    const {name, email, password} = req.body;

    try{
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({message: "User already exists"});

        const salt = await genSalt(10);
        const hashPassword = await hash(password, salt);
        const user = await User.create({name, email, password: hashPassword})

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "User Not Found"});

        const comparePassword = await compare(password, user.password)
        if (comparePassword) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}