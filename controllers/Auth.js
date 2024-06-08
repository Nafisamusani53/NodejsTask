const User = require("../models/User");
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.login = async(req,res) => {
    console.log("login controller")
    try{
        const {email, password} = req.body;

        // check if the email exist or not
        let user = await User.findOne({email})

        if(!user){
            //Return 401 unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            })
        }

        // Now match the password
        if(await bcrypt.compare(password, user.password)){
            //Generate JWT
            const payload = {
                email: user.email,
                role: user.role,
                id : user._id
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '2h'
            })

            user = user.toObject()
            user.token = token
            user.password = undefined

            const options = {
                maxAge : 3*24*60*60*1000,
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "LoggedIn successfully,"
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Incorrect password or email"
            })
        }

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.signup = async(req, res) => {
    try{
        const {
            userName,
            email,
            password, 
            confirmPassword,
        } = req.body


         //check if Password and confirm password matches or not?
        if(password !== confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password and ConfirmPassword dose not match"
            })
        }

        //check if user already exist or not 
        const existingUser = await User.findOne({email:  email, userName: userName});
        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "User already exists,Please sign in to continue"
            })
        }


        //Hash Password
        const hashPassword = await bcrypt.hash(password ,10)


        let user = await User.create({
            userName,
            email,
            password: hashPassword, 
        })

        user.password = undefined

        res.status(200).json({
            success: true,
            data : user,
            message : "Account created successfully"
        })
    }
    
    catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to create Account",
            error: err.message
        })
    }
}