import { Router } from "express";
import multer from "multer";
import { upload } from "./utils/upload";

import { CreateUserController } from "./modules/createUser/CreateUserController";
import { CreateVideoController } from "./modules/createVideo/CreateVideoController";

const router = Router();

const createUserController = new CreateUserController();
const createVideoController = new CreateVideoController();

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

export { router };
