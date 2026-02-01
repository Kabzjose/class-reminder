import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//user schema

const userSchema= new mongoose.Schema({
    userName: {
        type: String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required:true,
        unique:true,
        trim:true
    },
    password: {
        type: String,
        required:true,
        minlength:6
    }
},{timestamps:true}
);

//hashing password before saving user
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){   //checks if password has been modified,we only hash if the pass is new /changed
        return next();
    }
    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
    next();
});
//hashing is a one way function, so we can not decryt the hashed password

//method to compare password during login
userSchema.methods.matchPassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const User= mongoose.model("User",userSchema);

export default User;