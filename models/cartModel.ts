import mongoose from "mongoose";

type CartType = { createdAt: NativeDate; updatedAt: NativeDate } & {
  user: mongoose.Types.ObjectId;
  cartItems: { product: mongoose.Types.ObjectId }[];
};

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", cartSchema);
class Cart_ {
  getById(cartId: string) {
    return CartModel.find({ _id: cartId });
  }
  upsert(
    userId: string,
    data:
      | mongoose.UpdateWithAggregationPipeline
      | mongoose.UpdateQuery<CartType>
      | undefined
  ) {
    return CartModel.updateOne({ user: userId }, data, { upsert: true });
  }
}

export const Cart = new Cart_();
