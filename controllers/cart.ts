import { Request, Response } from "express";
import { Cart } from "../models";
import { asyncHandler } from "../utils";
import { STATUS } from "../constants";

export const getOneCart = asyncHandler(async (req: Request, res: Response) => {
  const { cartId } = req.params;
  const cart = await Cart.getById(cartId).select("-user");
  if (cart) {
    const data = await cart.populate("cartItems.product");
    return res.json(data.cartItems);
  }
  res.status(500).json({ message: "Sorry, An error occured :(" });
});

export const upsertCart = asyncHandler(async (req: Request, res: Response) => {
  const { userId, orderItems } = req.body;
  const { url, baseUrl, originalUrl } = req;
  console.log({ url, baseUrl, originalUrl }); //TODO: delete this line
  const cart = await Cart.upsert(userId?.toString(), {
    user: userId,
    cartItems: orderItems,
  });
  if (cart) {
    return baseUrl === "/cart"
      ? res.json({
          status: STATUS.SUCCESS,
          message: "Cart saved successfully",
        })
      : res.json({
          url: "/cart/" + cart?._id,
        });
  }
  res.status(404);
  throw new Error("The requested product was not found :(");
});
