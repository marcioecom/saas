import { Router } from "express";
import multer from "multer";
import { upload } from "./utils/upload";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { createUserFactory } from "./modules/accounts/useCases/createUser/CreateUserFactory";
import { AuthenticateUserFactory } from "./modules/accounts/useCases/authUser/AuthenticateUserFactory";

import { CreateVideoController } from "./modules/createVideo/CreateVideoController";
import { StreamVideoController } from "./modules/streamVideo/StreamVideoController";

const router = Router();

const createVideoController = new CreateVideoController();
const streamVideoController = new StreamVideoController();

router.get("/", (req, res) => {
  return res.json({
    message: "Ok",
  });
});

router.get("/stream", streamVideoController.handle);

router.post("/users", (req, res) => {
  createUserFactory().handle(req, res);
});

router.get("/videos", ensureAuthenticated, (req, res) => {
  return res.json([
    {
      id: 1,
      name: "Mateus Silva",
      website: "https://devacademy.com.br",
    },
    {
      id: 2,
      name: "Mark Zuckerberg",
      website: "https://facebook.com",
    },
    {
      id: 3,
      name: "Bill Gates",
      website: "https://www.microsoft.com",
    },
  ]);
});

router.post(
  "/videos",
  multer(upload).single("file"),
  createVideoController.handle
);

router.post("/login", (req, res) => {
  AuthenticateUserFactory().handle(req, res);
});

export { router };
