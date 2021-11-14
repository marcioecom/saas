import { Router } from "express";
import multer from "multer";
import { upload } from "./utils/upload";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { createUserFactory } from "./modules/accounts/useCases/createUser/CreateUserFactory";
import { AuthenticateUserFactory } from "./modules/accounts/useCases/authUser/AuthenticateUserFactory";
import { ShowVideosFactory } from "./modules/stream/useCases/showVideos/ShowVideosFactory";
import { CreateVideoFactory } from "./modules/stream/useCases/createVideo/CreateVideoFactory";
import { StreamVideoFactory } from "./modules/stream/useCases/streamVideo/StreamVideoFactory";

const router = Router();

router.get("/", (req, res) => {
  return res.json({
    message: "Ok",
  });
});

router.post("/users", (req, res) => {
  createUserFactory().handle(req, res);
});

router.post("/login", (req, res) => {
  AuthenticateUserFactory().handle(req, res);
});

router.get("/videos", ensureAuthenticated, (req, res) => {
  ShowVideosFactory().handle(req, res);
});

router.post("/videos", multer(upload).single("file"), (req, res) => {
  CreateVideoFactory().handle(req, res);
});

router.get("/stream/:id", (req, res) => {
  StreamVideoFactory().handle(req, res);
});

export { router };
