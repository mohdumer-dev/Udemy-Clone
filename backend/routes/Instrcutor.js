import { Router } from "express";
import { createCourse, GetAllCourse } from "../controllers/Course.js";
import { Authentication } from "../middleware/Auth.js";
import { CreateSection } from "../controllers/Section.js";
import { createSubSection } from "../controllers/SubSection.js";
const Instructor=Router()



Instructor.post('/createCourse',Authentication,createCourse)
Instructor.get('/allCourse',GetAllCourse)


Instructor.post('/createSection',Authentication,CreateSection)
Instructor.post('/createSubSection',Authentication,createSubSection)

export default Instructor