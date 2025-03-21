import { Router } from "express";
import { createCourse } from "../controllers/Course.js";
import { Authentication } from "../middleware/Auth.js";
const Instructor=Router()



Instructor.post('/createCourse',Authentication,createCourse)

export default Instructor