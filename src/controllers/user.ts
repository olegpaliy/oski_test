import { ControllerAction } from "../types/ControllerAction";
import { userService } from "../services/user";
import createHttpError from "http-errors";
import cache from "../middleware/cache";
import jwt from "jsonwebtoken";
import bcryp from "bcryptjs";

const { Secret } = process.env;

const { Unauthorized, BadRequest, NotFound } = createHttpError;

const signUp: ControllerAction = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      next(new BadRequest("email or password is missing"));

      return;
    }
    const user = await userService.signUp(req.body);

    res.send(user);
  } catch (error) {
    next(error);
  }
};

const signIn: ControllerAction = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      next(new Unauthorized("email or password is incorrect"));

      return;
    }

    const checkUser = await userService.signIn(req.body);

    if (!checkUser) {
      next(new NotFound("User not found"));

      return;
    }

    const passwordIsValid = bcryp.compareSync(
      req.body.password,
      checkUser.password
    );

    if (!passwordIsValid) {
      next(new Unauthorized("email or password is incorrect"));

      return;
    }

    const token = jwt.sign({ id: checkUser.id }, `${Secret}`, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400,
    });

    cache.set(token, "logout", 86400);

    res.send({ token });
  } catch (error) {
    next(error);
  }
};

const profile: ControllerAction = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.userId);

    res.send(user);
  } catch (error) {
    next(error);
  }
};

const signOut: ControllerAction = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    const [, token] = authHeader.split(" ");
    cache.del(token);

    res.send({ msg: "logout" });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  signUp,
  signIn,
  profile,
  signOut,
};
