import { Request, Response } from "express";
import { AuthenticateUser } from "./AuthenticateUser";

class AuthenticateUserController {
  // eslint-disable-next-line no-unused-vars
  constructor(private authenticateUser: AuthenticateUser) {}

  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const token = await this.authenticateUser.execute({
        email,
        password,
      });

      return res.json(token);
    } catch (error: any) {
      if (error.message === "User does not exists") {
        return res.status(404).json({
          error: error.message,
        });
      }

      return res.status(401).json({
        error: error.message,
      });
    }
  }
}

export { AuthenticateUserController };
