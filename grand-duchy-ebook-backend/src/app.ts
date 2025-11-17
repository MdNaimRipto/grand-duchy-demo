import express, { Application, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import pathNotFoundErrorHandler from "./errors/pathNotFoundErrorHandler";
import { Routers } from "./app/routes/router";
import { updateFunction } from "./util/updateExistingDBCollection";

const app: Application = express();

// ? Middlewares:
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Basic Page
app.get("/backend", async (req: Request, res: Response) => {
  res.status(httpStatus.OK).send({
    message: "Grand Duchy Server Running Successfully",
    statusCode: httpStatus.OK,
  });
});

// ! Do Not call this function Unnesecerry
// (async () => {
//   await updateFunction();
// })();

//* Main endpoint
// app.use("/backend/v1.0.0/apis", Routers);
app.use("/v1.0.0/apis", Routers);

//* Global error Handler
app.use(globalErrorHandler);

//* Path Not Found Error Handler
app.use(pathNotFoundErrorHandler);

export default app;
