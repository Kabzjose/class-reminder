import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Generate jwt token 
const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

// Register user
export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        
        // Checking if user exists
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: "User already exists"});
        }
        
        // Create user
        const user = await User.create({name, email, password});
        
        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Register error:', error);  // ← Add this for debugging
        res.status(500).json({message: error.message});
    }
};

// Log in user
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;  // ✅ Removed 'name'
        
        // Check if user exists
        const user = await User.findOne({email});  // ✅ Added 'await'
        if (!user) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        
        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        // Generate token
        const token = generateToken(user._id);
        
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);  // ← Add this for debugging
        res.status(500).json({message: error.message});
    }
};

// Get current user
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({success: true, user});
    } catch (error) {
        console.error('Get user error:', error);  // ← Add this for debugging
        res.status(500).json({message: error.message});
    }
};