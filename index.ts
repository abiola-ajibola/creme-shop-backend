import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDb } from "./database";
import { Product } from "./models";

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => unknown) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const func = await fn(req, res, next);
      return func;
    } catch (e) {
      if (next) {
        next(e);
      }
    }
  };

config();
const app: Express = express();
const { NODE_PORT, FRONTEND_URL } = process.env;

connectDb();

app.use(cors({ origin: FRONTEND_URL }));

app.get("/test", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  if (products) return res.json(products);
  res.status(500).json({ message: "Sorry, An error occured :(" });
});

app.get(
  "/products/:productId",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.productId);
    if (product) return res.json(product);
    res.status(404);
    throw new Error("The requested product was not found :(");
  })
);

app.get("/*", (req, res) => {
  res.status(404).json({ message: "Resource not found" });
  throw new Error("Resource not found :(");
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  console.log({ name: error.name });
  if (error.name === "CastError") {
    res.status(400);
    res.status(res.statusCode);
    res.json({ message: "Bad request!" });
    return;
  }
  res.json({ message: error.message });
});

app.listen(Number(NODE_PORT), () => {
  console.log("Listening on http://localhost:" + NODE_PORT);
});
