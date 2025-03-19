import SignValidation from "../validators/signup-auth.js";

export const ValidateSignup = async (req, res, next) => {
  try {
    const { success, error } = await SignValidation.safeParseAsync(req.body);
    if (!success) {
      return res.status(400).json({ errors: error.errors });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Server is fucked up" });
  }
};
