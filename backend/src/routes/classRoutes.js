import express from "express";
import protect from "../middleware/auth.js"
import {getClass,createClass,updateClass, deleteClass} from "../controllers/classControllers.js";

const router=express.Router()

//all routes require aurhentication
router.use(protect)

router.post("/", createClass);
router.get("/", getClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);


export default router;