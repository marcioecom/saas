import { PrismaVideosRepository } from "../../repositories/prisma/PrismaVideosRepository";
import { ShowVideos } from "./ShowVideos";
import { ShowVideosController } from "./ShowVideosController";

export const ShowVideosFactory = () => {
  const videosRepository = new PrismaVideosRepository();
  const showVideos = new ShowVideos(videosRepository);
  const showVideosController = new ShowVideosController(showVideos);

  return showVideosController;
};
