import User from './../models/User.js';
import md5 from 'md5';
import jwt from 'jsonwebtoken';

const postSignup = async (req, res) => {
    const { name, email,  password} = req.body;

    const namevalidationregex = /^[a-zA-Z\s]+$/;
    const emailvalidationregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordvalidationregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if(namevalidationregex.test(name)===false){
        return res.status(400).json({
            success: false,
            message: "Name should contain only letters and spaces", 
        })
    }

    if(emailvalidationregex.test(email)===false){
        return res.status(400).json({
            success: false,
            message: "Email is not valid", 
        })
    }

    if(passwordvalidationregex.test(password)===false){
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long and contain at least one letter and one number", 
        })
    }

    if(!name || !email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        })
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success: false,
            message: `User already exists with this ${email}`,
        })
    }

    const newUser = new User({name, email, password: md5(password)});

    const savedUser = await newUser.save();

    res.json({
        success: true,
        message: "User registered successfully",
        user: savedUser,
    })
};

const postLogin = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "email and password are required",
        })
    }

    const existingUser = await User.findOne({email, password: md5(password)}).select("_id name email");
    if(existingUser){
        const token = jwt.sign(
            {
                _id: existingUser._id,
                email: existingUser.email,
                name: existingUser.name,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({
            success: true,
            message: "user logged in successfully",
            user: existingUser,
            token,
        });
    }else{
        return res.status(400).json({
            success: false,
            message: "Invalid email and password",
        })
    }
};

export {postSignup, postLogin};