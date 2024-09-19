import mongoose, {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from "mongoose";

// Rather, a cart should optionally have a user, so that we can share a cart publicly without associating it to a user.
// Also, someone who has not signed in can have a cart, but only ailable on the frontend, in localstorage.

// A user created is created as non admin at signup, but can be made an admin from the Admin panel

type UserSchema = { createdAt: NativeDate; updatedAt: NativeDate } & {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  isAdmin: boolean;
  address?:
    | { street: string; city: string; state: string; country: string }
    | undefined;
};

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    country_code: {
      type: String,
      required: true,
    },
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("User", userSchema);
class User_ {
  #userDocument;
  constructor() {
    this.#userDocument = new UserModel();
  }

  getOne(
    filter: FilterQuery<UserSchema> | undefined,
    projection?: ProjectionType<UserSchema> | null | undefined
  ) {
    return UserModel.findOne(filter, projection);
  }

  getOneWithPassword(
    filter: FilterQuery<UserSchema> | undefined,
    projection?: ProjectionType<UserSchema> | null | undefined
  ) {
    return this.getOne(filter, projection).select("+password");
  }

  getById(
    id: string,
    projections: ProjectionType<UserSchema> | null | undefined,
    options?: QueryOptions<UserSchema> | null | undefined
  ) {
    return UserModel.findById(id, projections, options);
  }

  getAll() {
    return UserModel.find();
  }

  insertMany(data: Partial<UserSchema>[]) {
    return UserModel.insertMany(data);
  }

  create(data: Partial<UserSchema>) {
    return UserModel.create(data);
  }

  delete(id: string) {
    return UserModel.deleteOne({ _id: id });
  }

  updateOne(data: Partial<UserSchema>, update?: UpdateQuery<UserSchema>) {
    return UserModel.updateOne(data, update);
  }

  asPlainObject() {
    return this.#userDocument.toObject({ useProjection: true });
  }
}

export const User = new User_();
