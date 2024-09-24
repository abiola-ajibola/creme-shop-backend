import { NextFunction, Request, Response } from "express";
// import { verifyToken } from "../utils";
import { StatusCodes } from "http-status-codes";
import { MEESAGE, STATUS } from "../constants";

// export async function isAuthenticated(
// req: Request,
// res: Response,
// next: NextFunction
// ) {
//   try {
//     const result = await verifyToken(req.headers.authorization || "");
//     console.log({ result });
//     next();
//   } catch (error) {
//     console.log({ error });
// res
//   .status(StatusCodes.UNAUTHORIZED)
//   .json({ status: STATUS.ERROR, message: MEESAGE.UNAUTHORIZED });
//   }
// }

declare module "express-session" {
  export interface SessionData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: { [key: string]: any };
  }
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session.user) {
    next();
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ status: STATUS.ERROR, message: MEESAGE.UNAUTHORIZED });
  }
}
