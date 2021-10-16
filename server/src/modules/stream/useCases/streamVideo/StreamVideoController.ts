import { Request, Response } from "express";
// import { resolve } from "path";
// import fs from "fs";
// import { Readable } from "stream";
import { S3 } from "aws-sdk";
import { StreamVideo } from "./StreamVideo";

class StreamVideoController {
  // eslint-disable-next-line no-unused-vars
  constructor(private streamVideo: StreamVideo) {}

  async handle(req: Request, res: Response) {
    // const { id } = req.params;
    // const { range } = req.headers;

    try {
      // const { ContentLength } = await this.streamVideo.execute(id);
      // await this.streamVideo.execute(id);
      // const videoPath = resolve(
      //   __dirname,
      //   "..",
      //   "..",
      //   "tmp",
      //   "uploads",
      //   "video.mp4"
      // );
      // const videoSize = fs.statSync(videoPath).size;

      // const start = Number(range?.replace(/\D/g, ""));

      // const CHUNK_SIZE = 10000;
      // const end = Math.min(start + CHUNK_SIZE, Number(ContentLength) - 1);

      // const headers = {
      //   "Content-Range": `bytes ${start}-${end}/${ContentLength}`,
      //   "Accept-Ranges": "bytes",
      //   "Content-type": "video/mp4",
      //   "Content-Length": CHUNK_SIZE,
      // };

      // res.writeHead(206, headers);

      // const videoStream = fs.createReadStream(videoPath, {
      //   start,
      //   end,
      // });

      // fs.createWriteStream()
      // return videoStream.pipe(res);

      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });

      const getParams = {
        Bucket: "vclick-raw-videos",
        Key: "3881d6aa872fa702bd095dc259ec2d90-video.mp4",
      };

      return s3.getObject(getParams).createReadStream().pipe(res);
    } catch (error: any) {
      return res.json({
        error: error.message,
      });
    }
  }
}

export { StreamVideoController };
