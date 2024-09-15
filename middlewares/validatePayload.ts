import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema } from "yup";

export function validatePayload(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { stripUnknown: true });
      next();
    } catch (e: any) {
      console.log({ e });
      res.status(StatusCodes.BAD_REQUEST).json({ message: e.errors });
    }
  };
}
