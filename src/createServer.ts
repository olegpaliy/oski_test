import cors from "cors";
import userRouter from "./routes/user";
import createHttpError, { HttpError } from "http-errors";
import express, { NextFunction, Request, Response } from "express";

export const createServer = () => {
  const app = express();

  app.use(cors()).use(express.json());

  app.use("/users", userRouter);

  app.use((req, res, next) => {
    next(createHttpError(404));
  });

  app.use(
    (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
      const { status = 500, message = "Internal Server Error" } = err;
      res.status(status).json({ message });
    }
  );

  return app;
};
