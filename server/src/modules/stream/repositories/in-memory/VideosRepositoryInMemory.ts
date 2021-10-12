import { v4 as uuid } from "uuid";
import { Video } from "../../domain/Video";
import { IVideosRepository } from "../IVideosRepository";

class VideoRepositoryInMemory implements IVideosRepository {
  private videos: Video[] = [];

  async create(video: Video): Promise<Video> {
    Object.assign(video, {
      id: uuid(),
    });

    this.videos.push(video);
    return video;
  }
}

export { VideoRepositoryInMemory };
