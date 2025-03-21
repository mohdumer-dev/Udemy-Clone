import { Router } from "express";
import { createCourse, GetAllCourse } from "../controllers/Course.js";
import { Authentication } from "../middleware/Auth.js";
const Instructor=Router()



Instructor.post('/createCourse',Authentication,createCourse)
Instructor.get('/allCourse',GetAllCourse)

export default Instructor