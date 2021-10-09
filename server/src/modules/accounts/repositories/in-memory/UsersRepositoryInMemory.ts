import { v4 as uuid } from "uuid";
import { User } from "../../domain/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    Object.assign(user, {
      id: uuid(),
    });

    this.users.push(user);
    return user;
  }

  async exists(email: string): Promise<boolean> {
    const userExists = this.users.some(user => user.email === email);
    return userExists;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userByEmail = this.users.find(user => user.email === email);

    if (!userByEmail) {
      return null;
    }

    return userByEmail;
  }
}

export { UsersRepositoryInMemory };
