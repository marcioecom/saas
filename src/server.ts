import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { router } from "./routes";
import "dotenv/config";

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(router);

// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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
