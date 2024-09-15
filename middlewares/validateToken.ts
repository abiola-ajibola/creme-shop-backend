import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils";
import { StatusCodes } from "http-status-codes";
import { MEESAGE, STATUS } from "../constants";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await verifyToken(req.headers.authorization || "");
    console.log({ result });
    next();
  } catch (error) {
    console.log({ error });
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ status: STATUS.ERROR, message: MEESAGE.UNAUTHORIZED });
  }
}
