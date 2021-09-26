import { Request, Response } from "express";
import { AuthenticateUser } from "./AuthenticateUser";

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUser();

    const token = await authenticateUser.execute({
      email,
      password,
    });

    return res.json(token);
  }
}

export { AuthenticateUserController };
