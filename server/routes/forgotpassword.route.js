import express from "express"
import { changePassword, sendResetEmail } from "../controllers/forgotpassword.controller.js";
import { verifyPasswordReset } from "../middlewares/verify.middleware.js";

const fpRouter = express.Router();


fpRouter.post('/forgot-password', sendResetEmail);
fpRouter.post('/verify', verifyPasswordReset, changePassword);

export default fpRouter;