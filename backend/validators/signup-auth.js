import { z } from "zod";

const SignValidation = z
  .object({
    email: z.string().email().max(70).min(15).trim(),
    firstname: z.string().max(40).min(2).trim(),
    lastname: z.string().max(40).min(2).trim(),
    accountType: z.enum(["Student", "Instructor", "Admin"]),
    password: z.string().min(5).max(24).trim(),
    confirmPassword: z.string().min(5).max(24).trim(),
    phone_number: z
    .string()
    .length(10, "Phone Number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone Number must contain only numbers"),
    otp: z
      .string()
      .length(4, "OTP must be exactly 4 digits")
      .regex(/^\d{4}$/, "OTP must be a number"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password Donot Match",
    path: ["confirmPassword"],
  });

export default SignValidation;
