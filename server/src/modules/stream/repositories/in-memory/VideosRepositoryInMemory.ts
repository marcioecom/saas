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

  async findById(id: string): Promise<Video | null> {
    const videoFind = this.videos.find(video => video.id === id);

    if (!videoFind) return null;

    return videoFind;
  }
}

export { VideoRepositoryInMemory };
