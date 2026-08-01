import express from "express";
import {
  ForgotPassword,
  ResetPassword,
  SignIn,
  SignUp,
  VerifyEmail,
} from "./auth.controller.js";
import { validateSchema } from "../../middlewares/validate-schema.js";
import { signUpSchema } from "./schema/signup.schema.js";
import { verifyEmailSchema } from "./schema/verifyEmail.schema.js";
import { loginSchema } from "./schema/login.schema.js";
import { forgotPasswordSchema } from "./schema/forgotPassword.schema.js";
import { resetPasswordSchema } from "./schema/resetPassword.schema.js";

const router = express.Router();

router.post("/signup",validateSchema({ body: signUpSchema }), SignUp);
router.get("/signin",validateSchema({ query: loginSchema }), SignIn);
router.put("/verify-email",validateSchema({ body: verifyEmailSchema }), VerifyEmail);
router.get("/forgot-password",validateSchema({ query: forgotPasswordSchema }), ForgotPassword);
router.put("/reset-password",validateSchema({ body: resetPasswordSchema }), ResetPassword);

export default router;
