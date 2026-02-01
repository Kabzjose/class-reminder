import express from "express"
const router=express.Router()
import { registerUser,login,getCurrentUser } from "../controllers/authControllers"
import protect from "../middleware/auth"


router.post('/register',registerUser)
router.post('/login',login)
router.get('/',protect,getCurrentUser)

module.exports= router