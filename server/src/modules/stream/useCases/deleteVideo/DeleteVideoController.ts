import { Request, Response } from "express";
import { DeleteVideo } from "./DeleteVideo";

class DeleteVideoController {
  // eslint-disable-next-line no-unused-vars
  constructor(private deleteVideo: DeleteVideo) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const video = await this.deleteVideo.execute(id);

      return res.json(video);
    } catch (err: any) {
      return res.status(404).json({
        error: true,
        message: err.message,
      });
    }
  }
}

export { DeleteVideoController };
