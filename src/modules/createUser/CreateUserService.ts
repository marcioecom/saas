import { prisma } from "../../database/prisma"
import { hash } from "bcryptjs"

interface IUserRequest {
  name?: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: IUserRequest) {
    const userAlredyExists = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (userAlredyExists) {
      throw new Error("User alredy exists");
    }

    const passwordHash = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash
      }
    })

    return user
  }
}

export { CreateUserService }
