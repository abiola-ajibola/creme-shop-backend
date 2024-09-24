import mongoose from "mongoose";

type CartType = { createdAt: NativeDate; updatedAt: NativeDate } & {
  user: mongoose.Types.ObjectId;
  cartItems: { product: mongoose.Types.ObjectId }[];
};

export const cartSchema = new mongoose.Schema(
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
        qty: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", cartSchema);
class Cart_ {
  getById(cartId: string) {
    return CartModel.findOne({ _id: cartId });
  }
  upsert(
    userId: string,
    data:
      | mongoose.UpdateWithAggregationPipeline
      | mongoose.UpdateQuery<CartType>
      | undefined
  ) {
    return CartModel.findOneAndUpdate({ user: userId }, data, { upsert: true });
  }
}

export const Cart = new Cart_();
