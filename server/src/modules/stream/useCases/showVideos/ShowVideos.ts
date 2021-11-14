import { IVideosRepository } from "../../repositories/IVideosRepository";

class ShowVideos {
  // eslint-disable-next-line no-unused-vars
  constructor(private videosRepository: IVideosRepository) {}

  async execute() {
    const videos = await this.videosRepository.showVideos();

    if (!videos) {
      throw new Error("Videos not found");
    }

    return videos;
  }
}

export { ShowVideos };
