import { PrismaVideosRepository } from "../../repositories/prisma/PrismaVideosRepository";
import { StreamVideo } from "./StreamVideo";
import { StreamVideoController } from "./StreamVideoController";

export const streamVideoFactory = () => {
  const videosRepository = new PrismaVideosRepository();
  const streamVideo = new StreamVideo(videosRepository);
  const streamVideoController = new StreamVideoController(streamVideo);

  return streamVideoController;
};
