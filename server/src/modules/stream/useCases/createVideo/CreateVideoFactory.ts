import { PrismaVideosRepository } from "../../repositories/prisma/PrismaVideosRepository";
import { CreateVideo } from "./CreateVideo";
import { CreateVideoController } from "./CreateVideoController";

export const CreateVideoFactory = () => {
  const videosRepository = new PrismaVideosRepository();
  const createVideo = new CreateVideo(videosRepository);
  const createVideoController = new CreateVideoController(createVideo);

  return createVideoController;
};
