import { PrismaVideosRepository } from "../../repositories/prisma/PrismaVideosRepository";
import { DeleteVideo } from "./DeleteVideo";
import { DeleteVideoController } from "./DeleteVideoController";

export const deleteVideoFactory = () => {
  const videosRepository = new PrismaVideosRepository();
  const deleteVideo = new DeleteVideo(videosRepository);
  const deleteVideoController = new DeleteVideoController(deleteVideo);

  return deleteVideoController;
};
