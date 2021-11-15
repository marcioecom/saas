import { prisma } from "../../../../database/prisma";
import { User } from "../../domain/User";
import { IUsersRepository } from "../IUsersRepository";

class PrismaUsersRepository implements IUsersRepository {
  async exists(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  }

  async create({ name, email, password }: User): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return user;
  }

  async findById(id: string) {
    const userInfos = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userInfos) return null;

    return userInfos;
  }
}

export { PrismaUsersRepository };
