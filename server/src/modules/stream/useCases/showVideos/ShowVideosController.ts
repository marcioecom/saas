import { Request, Response } from "express";
import { ShowVideos } from "./ShowVideos";

class ShowVideosController {
  // eslint-disable-next-line no-unused-vars
  constructor(private showVideos: ShowVideos) {}

  async handle(req: Request, res: Response) {
    try {
      const videos = await this.showVideos.execute();

      return res.json(videos);
    } catch (error) {
      return res.json(error);
    }
  }
}

export { ShowVideosController };
