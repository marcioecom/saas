import { Request, Response } from "express";
import { resolve } from "path";
import fs from "fs";

class StreamVideoController {
  async handle(req: Request, res: Response) {
    const { range } = req.headers;
    const videoPath = resolve(
      __dirname,
      "..",
      "..",
      "tmp",
      "uploads",
      "video.mp4"
    );
    const videoSize = fs.statSync(videoPath).size;

    const start = Number(range?.replace(/\D/g, ""));

    const CHUNK_SIZE = 10000;
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-type": "video/mp4",
      "Content-Length": CHUNK_SIZE,
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, {
      start,
      end,
    });

    videoStream.pipe(res);
  }
}

export { StreamVideoController };
