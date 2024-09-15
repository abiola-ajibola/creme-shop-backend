import { NextFunction, Request, Response } from "express";

export const asyncHandler =
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