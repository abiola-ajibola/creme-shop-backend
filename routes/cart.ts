import { Router } from "express";
import { getOneCart, upsertCart } from "../controllers";
import { verifyToken } from "../utils";

const cartRouter = Router();

cartRouter.put("/", verifyToken, upsertCart);

cartRouter.get("/:cartId", getOneCart);

export { cartRouter };
