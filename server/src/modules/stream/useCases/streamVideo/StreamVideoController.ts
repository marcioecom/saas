import { Request, Response } from "express";
import { S3 } from "aws-sdk";
import { StreamVideo } from "./StreamVideo";

class StreamVideoController {
  // eslint-disable-next-line no-unused-vars
  constructor(private streamVideo: StreamVideo) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    try {
      const video = await this.streamVideo.execute(id);

      const getParams = {
        Bucket: "vclick-raw-videos",
        Key: video.key,
      };

      const s3Stream = s3
        .getObject(getParams)
        .createReadStream() // { highWaterMark: 1 * 1024 }
        .pipe(res);

      s3Stream.on("error", err => {
        console.error(err);
      });
      s3Stream.on("close", () => {
        console.log("Done.");
      });

      return s3Stream;
    } catch (error) {
      return res.json(error);
    }
  }
}

export { StreamVideoController };
