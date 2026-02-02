import express from "express"
const router=express.Router()
import { registerUser,login,getCurrentUser } from "../controllers/authControllers.js"
import protect from "../middleware/auth.js"


router.post('/register',registerUser)
router.post('/login',login)
router.get('/me',protect,getCurrentUser)

export default router