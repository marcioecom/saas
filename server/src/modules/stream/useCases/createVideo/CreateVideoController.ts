import { Request, Response } from "express";
import { CreateVideo } from "./CreateVideo";

class CreateVideoController {
  // eslint-disable-next-line no-unused-vars
  constructor(private createVideo: CreateVideo) {}

  async handle(req: Request, res: Response) {
    const { originalname: name, size, key } = req.file!;

    try {
      const video = await this.createVideo.execute({
        name,
        key,
        size,
      });

      return res.json(video);
    } catch (error) {
      return res.json(error);
    }
  }
}

export { CreateVideoController };
