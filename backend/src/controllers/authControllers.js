import User from "../models/user";
import jwt from "jsonwebtoken"


//generate jwt token 
const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{
        expiresIn: '7d'
    })
}

//Registr user
export const registerUser= async (req,res)=>{
    try {
        const {name,email,password}=req.body
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        //checking if user exists
        const userExists=await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"User already exists"})
        }
        //create user
        const user= await User.create({name,email,password})
        //generate token
        const token = generateToken(user._id)

        res.status(201).json({
            success:true,
            token,
            user:{
                id: user._id,
                name:user.name,
                email:user.email

            }
        })
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

//log in user
export const login= async (req,res)=>{
    try {
        const {name,email,password}=req.body
        //check if user exists
        const user=User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }
        //check password
        const isMatch= await user.matchPassword(password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }

        //generate token
        const token=generateToken(user._id)
        res.json({
            success:true,
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
          res.status(500).json({message:error.message})
    }
}

//get current user
export const getCurrentUser=async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({success:true,user})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}