import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

// eslint-disable-next-line consistent-return
export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.redirect("/login");
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.SECRET || "secret") as IPayload;

    req.user_id = sub;

    next();
  } catch (error) {
    return res.status(401).end();
  }
}
