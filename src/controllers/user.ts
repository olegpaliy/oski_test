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

    const user = await userService.signIn(req.body);

    if (!user) {
      next(new NotFound("User not found"));

      return;
    }

    const passwordIsValid = bcryp.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      next(new Unauthorized("email or password is incorrect"));

      return;
    }

    const token = jwt.sign({ id: user.id }, `${Secret}`, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400,
    });

    // console.log(token);

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

const getUserAssessment: ControllerAction = async (req, res, next) => {
  try {
    const usersAssessment = await userService.getUserAssessment(
      req.params.userAssessmentId, req.params.userId
    );

    res.send(usersAssessment);
  } catch (error) {
    next(error);
  }
};

const updateUserAssessment: ControllerAction = async (req, res, next) => {
  try {
    const updateUserAssessment = await userService.updateUserAssessment(
      req.params.userAssessmentId,
      req.body
    );

    res.send(updateUserAssessment);
  } catch (error) {
    next(error);
  }
};

export const userController = {
  signUp,
  signIn,
  profile,
  signOut,
  getUserAssessment,
  updateUserAssessment,
};
