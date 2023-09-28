import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { UserAttributes } from "../types/User";
import { ControllerAction } from "../types/ControllerAction";
import cache from "./cache";
const { Secret } = process.env;
const { Unauthorized } = createHttpError;

export const authMiddleware: ControllerAction = (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  const [, token] = authHeader.split(" ");

  if (!token) {
    next(new Unauthorized("token is missing"));

    return;
  }

  if (!cache.get(token)) {
    next(new Unauthorized("token not valid"));

    return;
  }

  try {
    const user = jwt.verify(token, Secret as string) as UserAttributes;
    if (!user) {
      next(new Unauthorized("token not valid"));

      return;
    }

    req.params.userId = user.id.toString();
  } catch (error: unknown) {
    next(new Unauthorized((error as Error).message));

    return;
  }

  next();
};
