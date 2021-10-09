import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IAuthRequest {
  email: string;
  password: string;
}

class AuthenticateUser {
  // eslint-disable-next-line no-unused-vars
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: IAuthRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("User does not exists");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    const token = sign(
      {
        email: user.email,
      },
      process.env.SECRET || "secret",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUser };
