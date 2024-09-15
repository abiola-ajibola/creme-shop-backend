import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDb } from "./database";
import { productsRouter, locationRouter, authRouter } from "./routes";

config();
const app: Express = express();
const { NODE_PORT, FRONTEND_URL } = process.env;

connectDb();

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/products", productsRouter);
app.use("/location", locationRouter);
app.use("/auth", authRouter);

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
