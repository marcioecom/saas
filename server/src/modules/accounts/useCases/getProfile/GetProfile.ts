import { IUsersRepository } from "../../repositories/IUsersRepository";

class GetProfile {
  // eslint-disable-next-line no-unused-vars
  constructor(private usersRepository: IUsersRepository) {}

  async execute(userId: string) {
    const userInfos = await this.usersRepository.findById(userId);

    if (!userInfos) {
      throw new Error("User not found");
    }

    return userInfos;
  }
}

export { GetProfile };
