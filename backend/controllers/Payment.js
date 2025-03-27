import { UserModel } from "../models/User.js";
import { CourseModel } from "../models/Course.js";
import mongoose from "mongoose";
import instance from "../config/razorpay.js";

// capture and create an order in Razarpay
export const CapturePayment = async (req, res) => {
  try {
    // Get CourseId and UserId
    const { Course_id } = req.body;
    const user_id = req.id;

    // Validation
    if (!Course_id || !user_id) {
      return res
        .status(400)
        .json({ success: false, msg: "Fields need to be filled" });
    }

    // Check if course exists
    const CourseDetails = await CourseModel.findOne({ _id: Course_id });

    if (!CourseDetails) {
      return res
        .status(400)
        .json({ success: false, msg: "Course does not exist" });
    }

    // Check if user has already purchased the course
    const UserDetails = await UserModel.findOne({ _id: user_id });

    if (!UserDetails) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Convert course ID to mongoose ObjectId
    const course_id = new mongoose.Types.ObjectId(CourseDetails._id);

    if (UserDetails.courses.includes(course_id)) {
      return res
        .status(200)
        .json({ success: true, msg: "Course already purchased" });
    }
    // create a option bracket
    const option = {
      amount: CourseDetails.price * 100,
      receipt:
        Date.now().toString() + Math.floor(Math.random() * 1000).toString(),
      currency: "INR",
      notes: {
        userId: UserDetails._id,
        courseId: CourseDetails._id,
      },
    };
    // create a order
    try {
      const response = await instance.orders.create(option);
      console.log(response);
      return res.json({
        success: true,
        courseName: CourseDetails.title,
        courseDescription: CourseDetails.description,
        thubmnail: CourseDetails.thumbnail,
        order_id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        msg: "Error while making bucket  in Razorpay",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Error while creating an order in Razorpay",
    });
  }
};
