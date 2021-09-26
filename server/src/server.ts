import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "dotenv/config";
import cors from "cors";
import { router } from "./routes";

const port = process.env.PORT;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message === "Email/Password incorrect") {
    return res.status(401).json({
      error: err.message,
    });
  }

  if (err.message === "User does not exists") {
    return res.status(404).json({
      error: err.message,
    });
  }

  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server listenning on ${port}`));
