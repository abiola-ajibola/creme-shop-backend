import { Router } from "express";
import { getOneCart, upsertCart } from "../controllers";

import { isAuthenticated, session } from "../middlewares";

const cartRouter = Router();
cartRouter.use(session);

cartRouter.put("/", isAuthenticated, upsertCart);

cartRouter.get("/:cartId", getOneCart);

export { cartRouter };
