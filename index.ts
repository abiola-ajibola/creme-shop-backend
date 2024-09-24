import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import { connectDb } from "./database";
import {
  productsRouter,
  locationRouter,
  authRouter,
  cartRouter,
} from "./routes";

config();
const app: Express = express();
const { NODE_PORT, FRONTEND_URL } = process.env;

connectDb();

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});
app.disable("x-powered-by");

app.get("/test", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/products", productsRouter);
app.use("/location", locationRouter);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);

app.get("/*", (req, res) => {
  res.status(404).json({ message: "Resource not found" });
  throw new Error("Resource not found :(");
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  console.log({ name: error.name });
  console.log({ error });
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
