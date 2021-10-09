/* eslint-disable no-unused-vars */
import { User } from "../domain/User";

export interface IUsersRepository {
  create(user: User): Promise<User>;
  exists(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
}
