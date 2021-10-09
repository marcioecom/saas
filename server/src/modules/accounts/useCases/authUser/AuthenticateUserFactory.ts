import { PrismaUsersRepository } from "../../repositories/prismaRepository/ PrismaUsersRepository";
import { AuthenticateUser } from "./AuthenticateUser";
import { AuthenticateUserController } from "./AuthenticateUserController";

export const AuthenticateUserFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUser = new AuthenticateUser(usersRepository);
  const authenticateUserController = new AuthenticateUserController(
    authenticateUser
  );

  return authenticateUserController;
};
