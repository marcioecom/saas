import { Router } from "express";
import { CreateUserController } from "./modules/createUser/CreateUserController";

const router = Router();

const createUserController = new CreateUserController();

router.get("/", (req, res) => {
  return res.json({
    message: "Ok",
  });
});

router.post("/users", createUserController.handle);

export { router };
