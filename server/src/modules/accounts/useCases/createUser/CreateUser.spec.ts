import { User } from "../../domain/User";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserService } from "./CreateUserService";

describe("Create User", () => {
  let usersRepository: IUsersRepository;
  let createUserService: CreateUserService;

  beforeAll(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(usersRepository);
  });

  it("Should be able to create a new user", async () => {
    const userData: User = {
      name: "Teste Name",
      email: "teste@mail.com",
      password: "password",
    };

    const user = await createUserService.execute(userData);

    expect(user).toHaveProperty("id");
    expect(user.email).toBe("teste@mail.com");
  });

  it("Should not be able to create a new user", async () => {
    const userData: User = {
      name: "Teste Existing Name",
      email: "testeExists@mail.com",
      password: "password",
    };

    await createUserService.execute(userData);

    await expect(createUserService.execute(userData)).rejects.toEqual(
      new Error("User alredy exists")
    );
  });
});
