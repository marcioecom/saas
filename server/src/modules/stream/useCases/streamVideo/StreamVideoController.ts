import { Request, Response } from "express";
import { StreamVideo } from "./StreamVideo";

class StreamVideoController {
  // eslint-disable-next-line no-unused-vars
  constructor(private streamVideo: StreamVideo) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const video = await this.streamVideo.execute(id);

      return res.json(video);
    } catch (error: any) {
      return res.json({
        message: error.message,
      });
    }
  }
}

export { StreamVideoController };
