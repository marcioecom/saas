import { Router } from "express";
import multer from "multer";
import { upload } from "./utils/upload";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

import { createUserFactory } from "./modules/accounts/useCases/createUser/CreateUserFactory";
import { authenticateUserFactory } from "./modules/accounts/useCases/authUser/AuthenticateUserFactory";
import { getProfileFactory } from "./modules/accounts/useCases/getProfile/GetProfileFactory";
import { showVideosFactory } from "./modules/stream/useCases/showVideos/ShowVideosFactory";
import { createVideoFactory } from "./modules/stream/useCases/createVideo/CreateVideoFactory";
import { streamVideoFactory } from "./modules/stream/useCases/streamVideo/StreamVideoFactory";

const router = Router();

router.get("/", (req, res) => {
  return res.json({
    message: "Ok",
  });
});

router.post("/users", (req, res) => {
  createUserFactory().handle(req, res);
});

router.get("/profile", ensureAuthenticated, (req, res) => {
  getProfileFactory().handle(req, res);
});

router.post("/login", (req, res) => {
  authenticateUserFactory().handle(req, res);
});

router.get("/videos", ensureAuthenticated, (req, res) => {
  showVideosFactory().handle(req, res);
});

router.post("/videos", multer(upload).single("file"), (req, res) => {
  createVideoFactory().handle(req, res);
});

router.get("/stream/:id", (req, res) => {
  streamVideoFactory().handle(req, res);
});

export { router };
