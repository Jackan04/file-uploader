import { Router } from "express";
import authController from "../controllers/authController.js";
import {
  signUpValidation,
  signInValidation,
} from "../middleware/validation.js";

const authRouter = Router();

authRouter.get("/sign-out", authController.sign_out_get);

authRouter.get("/sign-in", authController.sign_in_get);
authRouter.post("/sign-in", signInValidation, authController.sign_in_post);

authRouter.get("/sign-up", authController.sign_up_get);
authRouter.post("/sign-up", signUpValidation, authController.sign_up_post);

export default authRouter;
