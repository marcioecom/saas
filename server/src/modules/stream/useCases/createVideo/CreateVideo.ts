import { Video } from "../../domain/Video";
import { IVideosRepository } from "../../repositories/IVideosRepository";

interface IVideoRequest {
  name: string;
  key: string;
  size: number;
  url?: string;
}

class CreateVideo {
  // eslint-disable-next-line no-unused-vars
  constructor(private videosRepository: IVideosRepository) {}

  async execute({ name, key, size, url = "" }: IVideoRequest) {
    let videoUrl;
    if (!url) {
      // eslint-disable-next-line no-unused-expressions
      process.env.STORAGE_TYPE === "s3"
        ? (videoUrl = `https://vclick-raw-videos.s3.us-east-2.amazonaws.com/${key}`)
        : (videoUrl = `${process.env.APP_URL}/files/${key}`);
    }

    const videoCreate = Video.create({
      name,
      key,
      size,
      url: videoUrl,
    });
    const video = await this.videosRepository.create(videoCreate);

    return video;
  }
}

export { CreateVideo };
