import { Request, Response } from "express";
import { Product } from "../models";
import { asyncHandler } from "../utils";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  if (products) return res.json(products);
  res.status(500).json({ message: "Sorry, An error occured :(" });
};

export const getSingleProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.productId);
    if (product) return res.json(product);
    res.status(404);
    throw new Error("The requested product was not found :(");
  })
