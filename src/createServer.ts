import cors from "cors";
import userRouter from "./routes/user";
import createHttpError, { HttpError } from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

export const createServer = () => {
  const app = express();

  app.use(cors()).use(express.json());

  app.use("/users", userRouter);

  app.use(
    (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
      const { status = 500, message = "Internal Server Error" } = err;
      res.status(status).json({ message });
    }
  );

  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Library API",
        version: "1.0.0",
      },
    },
    apis: ["./**/*.ts"],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

  app.use((req, res, next) => {
    next(createHttpError(404));
  });

  return app;
};
