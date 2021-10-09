import { User } from "../../domain/User";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserService } from "../createUser/CreateUserService";
import { AuthenticateUser } from "./AuthenticateUser";

describe("Authenticate User", () => {
  let usersRepository: IUsersRepository;
  let createUserService: CreateUserService;
  let authenticateUser: AuthenticateUser;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(usersRepository);
    authenticateUser = new AuthenticateUser(usersRepository);
  });

  it("Should be able to authenticate user", async () => {
    const userData: User = {
      name: "John Doe",
      email: "john@doe.com",
      password: "123456",
    };

    await createUserService.execute(userData);

    const response = await authenticateUser.execute({
      email: "john@doe.com",
      password: "123456",
    });

    expect(response.split(".")).toHaveLength(3);
    expect(typeof response).toBe("string");
  });

  it("Should not be able to authenticate with invalid email", async () => {
    const userData: User = {
      name: "John Doe",
      email: "john@doe.com",
      password: "123456",
    };

    await createUserService.execute(userData);

    const invalidData = {
      email: "invalid@mail.com",
      password: "123456",
    };

    await expect(authenticateUser.execute(invalidData)).rejects.toEqual(
      new Error("User does not exists")
    );
  });

  it("Should not be able to authenticate with invalid password", async () => {
    const userData: User = {
      name: "John Doe",
      email: "john@doe.com",
      password: "123456",
    };

    await createUserService.execute(userData);

    const invalidData = {
      email: "john@doe.com",
      password: "invalidPassword",
    };

    await expect(authenticateUser.execute(invalidData)).rejects.toEqual(
      new Error("Email/Password incorrect")
    );
  });
});
