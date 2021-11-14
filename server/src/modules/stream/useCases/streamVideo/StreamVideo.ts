// import { prisma } from "../../../../database/prisma";
import { IVideosRepository } from "../../repositories/IVideosRepository";

class StreamVideo {
  // eslint-disable-next-line no-unused-vars
  constructor(private videosRepository: IVideosRepository) {}

  async execute(id: string) {
    const video = await this.videosRepository.findById(id);

    if (!video) {
      throw new Error("Video not found");
    }

    return video;
  }
}

export { StreamVideo };
