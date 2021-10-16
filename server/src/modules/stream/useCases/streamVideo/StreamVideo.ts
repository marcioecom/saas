// import fs from "fs";
import { S3 } from "aws-sdk";
import { PrismaVideosRepository } from "../../repositories/prisma/PrismaVideosRepository";

class StreamVideo {
  // eslint-disable-next-line no-unused-vars
  constructor(private videosRepository: PrismaVideosRepository) {}

  async execute(id: string) {
    const video = await this.videosRepository.findById(id);

    if (!video) {
      throw new Error("Video not found");
    }

    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const getParams = {
      Bucket: "vclick-raw-videos",
      Key: "3881d6aa872fa702bd095dc259ec2d90-video.mp4",
    };

    // const file = fs.createWriteStream("../../../tmp/uploads/teste.mp4");
    // s3.getObject(getParams).createReadStream().pipe(file);
    const { Body, ContentLength } = await s3.getObject(getParams).promise();

    return { Body, ContentLength };
  }
}

export { StreamVideo };
