import { PrismaUsersRepository } from "../../repositories/prismaRepository/PrismaUsersRepository";
import { GetProfile } from "./GetProfile";
import { GetProfileController } from "./GetProfileController";

export const getProfileFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const getProfile = new GetProfile(usersRepository);
  const getProfileController = new GetProfileController(getProfile);

  return getProfileController;
};
