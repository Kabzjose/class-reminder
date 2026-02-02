import User from "../models/user.js";
import jwt from "jsonwebtoken"


//This middleware acts as a gatekeeper for protected routes. It ensures that only authenticated users (those with valid tokens) can access certain endpoints.

const protect= async(req,res,next)=>{
    try {
        let token;
        //check  for token in header
        if(req.headers.authorization.startsWith('Bearer')){
            token=req.headers.authorization.split(' ')[1]
        }
        if(!token){
            return res.status(401).json({message:"Not authorized , no token"})
        }
        //verify token
        
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export default protect;
   