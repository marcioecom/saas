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
    const video = await prisma.video.findUnique({
      where: {
        id,
      },
    });

    if (!video) return null;

    return video;
  }

  async deleteById(id: string) {
    const video = await prisma.video.delete({
      where: {
        id,
      },
    });

    if (!video) return null;

    return video;
  }

  async showVideos() {
    const videos = await prisma.video.findMany();

    if (!videos) return null;

    return videos;
  }
}

export { PrismaVideosRepository };
