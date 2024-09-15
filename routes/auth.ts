import { Router } from "express";
import { signUp, signIn } from "../controllers";
import { validatePayload } from "../middlewares";
import { userSigninSchema, userSignupSchema } from "../validationSchemas";

const authRouter = Router();

authRouter.post("/signup", validatePayload(userSignupSchema), signUp);
authRouter.post("/signin", validatePayload(userSigninSchema), signIn);

export { authRouter };
