import { Request, Response } from "express";
import { CreateUserService } from "./CreateUserService";

class CreateUserController {
  // eslint-disable-next-line no-unused-vars
  constructor(private createUser: CreateUserService) {}

  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const user = await this.createUser.execute({
        name,
        email,
        password,
      });

      return res.json(user);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}

export { CreateUserController };
