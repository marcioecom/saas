import { S3 } from "aws-sdk";
import { IVideosRepository } from "../../repositories/IVideosRepository";

class DeleteVideo {
  // eslint-disable-next-line no-unused-vars
  constructor(private videosRepository: IVideosRepository) {}

  async execute(id: string) {
    const video = await this.videosRepository.findById(id);

    if (!video) {
      throw new Error("Video not found");
    }

    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const params = {
      Bucket: "vclick-raw-videos",
      Key: video.key,
    };

    await s3.deleteObject(params).promise();

    this.videosRepository.deleteById(id);

    return { message: "Video deleted with success" };
  }
}

export { DeleteVideo };
