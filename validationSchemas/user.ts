import { object, string } from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";

export const userSignupSchema = object({
  firstname: string()
    .max(20, "First name cannot be more than 20 charaaters")
    .min(2, "First name cannot be less than 2 characters")
    .required(),
  lastname: string()
    .max(20, "Last name cannot be more than 20 charaaters")
    .min(2, "Last name cannot be less than 2 characters")
    .required(),
  email: string().email("Must be a valid email").required("Email is required"),
  password: string().required(),
  address: object({
    street: string().required("Street is required"),
    country: string().required("Country is required"),
    country_code: string().required("Country code is required"),
    state: string().required("State is required"),
    city: string().required("City is required"),
  }),
  phone: string()
    .test({
      message: "Invalid phone number",
      exclusive: true,
      name: "isValidPhoneNumber",
      test: (value) => (value ? isValidPhoneNumber(value) : false),
    })
    .required("Phone is required"),
  zip_code: string().required("Zip/post code is required"),
});

export const userSigninSchema = object({
  email: string().email("Must be a valid email").required("Email is required"),
  password: string().required(),
});
