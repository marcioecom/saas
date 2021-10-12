import { prisma } from "../../../../database/prisma";
import { Video } from "../../domain/Video";
import { IVideosRepository } from "../IVideosRepository";

class PrismaVideosRepository implements IVideosRepository {
  async create({ name, key, size, url = "" }: Video): Promise<Video> {
    const video = await prisma.video.create({
      data: {
        name,
        key,
        size,
        url,
      },
    });

    return video;
  }

  async findById(id: string): Promise<Video | null> {
    const video = await prisma.video.findFirst({
      where: {
        id,
      },
    });

    if (!video) return null;

    return video;
  }
}

export { PrismaVideosRepository };
