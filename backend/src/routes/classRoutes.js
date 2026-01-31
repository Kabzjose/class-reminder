import express from "express";

import {getClass,createClass,updateClass, deleteClass} from "../controllers/classControllers.js";

const router=express.Router()


router.post("/", createClass);
router.get("/", getClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);


export default router;