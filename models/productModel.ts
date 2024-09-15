import mongoose, { FilterQuery, QueryOptions } from "mongoose";

type ProductSchema = { createdAt: NativeDate; updatedAt: NativeDate } & {
  user: mongoose.Types.ObjectId;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: mongoose.Types.DocumentArray<
    { createdAt: NativeDate; updatedAt: NativeDate } & {
      name: string;
      rating: number;
      comment: string;
    }
  >;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
};

type MongooseFilterQuery = FilterQuery<ProductSchema> | undefined;

type ProductProjection =
  | mongoose.ProjectionType<ProductSchema>
  | null
  | undefined;

const reviewsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewsSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

export class Product_ {
  getOne(filter: MongooseFilterQuery, projection?: ProductProjection) {
    return ProductModel.findOne(filter, projection);
  }
  getById(
    id: string,
    projections?: ProductProjection,
    options?: QueryOptions<ProductSchema> | null | undefined
  ) {
    return ProductModel.findById(id, projections, options);
  }
  getAll() {
    return ProductModel.find();
  }
}

export const Product = new Product_();
