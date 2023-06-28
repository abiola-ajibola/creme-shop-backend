import { Router } from "express";
import { getAllProducts, getSingleProduct } from "../controllers";

const productsRouter = Router();

productsRouter.get("/", getAllProducts);

productsRouter.get("/:productId", getSingleProduct);

export { productsRouter };
