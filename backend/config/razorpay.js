import Razorpay from "razorpay";
import env from "dotenv";
env.config();
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export default instance;
