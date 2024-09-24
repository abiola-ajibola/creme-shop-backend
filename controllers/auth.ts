import { Request, Response } from "express";
import { User } from "../models";
import { asyncHandler } from "../utils";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
// import { generateToken } from "../utils/auth";
import { MEESAGE, STATUS } from "../constants";

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const password = await new Promise((resolve) =>
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ status: STATUS.ERROR, message: MEESAGE.ERROR });
      }
      resolve(hash);
    })
  );
  delete req.body.confirm_password;
  try {
    const user = await User.create({ ...req.body, password });
    if (user) {
      // const token = await generateToken(user.email);
      // console.log({ token });
      return res.status(StatusCodes.CREATED).json({
        status: STATUS.SUCCESS,
        user: user.asPlainObject(),
        // token,
      });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: STATUS.ERROR, message: MEESAGE.ERROR });
  }
});

export const signIn = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.getOneWithPassword({ email: req.body.email });
  if (!user) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ status: STATUS.FAIL, message: MEESAGE.NOT_FOUND });
    return;
  }
  const passAuth = await bcrypt.compare(req.body.password, user.password);
  if (passAuth) {
    // const token = await generateToken(user.email);
    req.session.regenerate(function (err) {
      if (err) {
        console.log({ err });
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ status: STATUS.ERROR, message: MEESAGE.ERROR });
      }

      // store user information in session, typically a user id
      req.session.user = { email: req.body.email };

      // save the session
      req.session.save(function (err) {
        if (err) {
          console.log({ err });
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ status: STATUS.ERROR, message: MEESAGE.ERROR });
        }
        res.status(StatusCodes.OK).json({
          status: STATUS.SUCCESS,
          // token,
          user: user.asPlainObject(),
        });
      });
    });
    return;
  }

  res
    .status(StatusCodes.BAD_REQUEST)
    .json({ status: STATUS.FAIL, message: MEESAGE.INCORRECT_CREDS });
});
