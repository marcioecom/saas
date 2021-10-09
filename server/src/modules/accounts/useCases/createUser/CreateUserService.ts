import { hash } from "bcryptjs";
import { User } from "../../domain/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  // eslint-disable-next-line no-unused-vars
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: IUserRequest) {
    const userAlredyExists = await this.usersRepository.exists(email);

    if (userAlredyExists) {
      throw new Error("User alredy exists");
    }

    const passwordHash = await hash(password, 8);

    const userCreate = User.create({
      name,
      email,
      password: passwordHash,
    });
    const user = await this.usersRepository.create(userCreate);

    return user;
  }
}

export { CreateUserService };
