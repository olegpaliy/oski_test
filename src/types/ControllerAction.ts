import { NextFunction, Request, Response } from "express";

export type ControllerAction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
