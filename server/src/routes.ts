import { Router } from "express";
import multer from "multer";
import { upload } from "./utils/upload";

import { CreateUserController } from "./modules/createUser/CreateUserController";
import { CreateVideoController } from "./modules/createVideo/CreateVideoController";
import { AuthenticateUserController } from "./modules/authUser/AuthenticateUserController";

const router = Router();

const createUserController = new CreateUserController();
const createVideoController = new CreateVideoController();
const authenticateUserController = new AuthenticateUserController();

router.get("/", (req, res) => {
  return res.json({
    message: "Ok",
  });
});

router.post("/users", createUserController.handle);

router.post(
  "/videos",
  multer(upload).single("file"),
  createVideoController.handle
);

router.post("/login", authenticateUserController.handle);

export { router };
