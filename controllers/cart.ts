import { Request, Response } from "express";
import { Cart } from "../models";
import { asyncHandler } from "../utils";

export const getOneCart = asyncHandler(async (req: Request, res: Response) => {
  const { cartId } = req.params;
  const cart = await Cart.getById(cartId);
  if (cart) return res.json(cart);
  res.status(500).json({ message: "Sorry, An error occured :(" });
});

export const upsertCart = asyncHandler(async (req: Request, res: Response) => {
  const { user } = req.query;
  const cart = await Cart.upsert(user?.toString() || "", req.body);
  if (cart) return res.json(cart);
  res.status(404);
  throw new Error("The requested product was not found :(");
});
