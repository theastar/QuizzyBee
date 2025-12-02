import express from "express";
import User from"../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d"});
}

router.post("/register", async (req, res) =>{
    try {
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({ meassage: "All fields are required"})
        }

        if(password.length < 6){
            return res.status(400).json({ meassage: "Password should be at least 6 characters long"})
        }

        if(username.length < 6){
            return res.status(400).json({ meassage: "Username should be at least 6 characters long"})
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail){
            return res.status(400).json({ meassage: "Email address already taken"})
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername){
            return res.status(400).json({ meassage: "Username already taken"})
        }

        const profileImage = `http://api.dicebear.com/7-x/avateaars/svr?=${username}`;

        const user = new User({

            username,
            email,
            password,
            profileImage,

        });

        await user.save();

        const token = generateToken(user._id);
        res.status(201).json({
            token,
            user:{
                _id: user._id,
                username: user.username,
                email: user.email
            },
        })



    } catch (error) {
        console.log("Error in register route", error);
        return res.status(500).json({ meassage: "Internal server error"});
    }

});

router.post("/login", async (req, res) =>{
    res.send("login success bitch!");

});


export default router;