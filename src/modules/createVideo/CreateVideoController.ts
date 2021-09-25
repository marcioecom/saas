import { Request, Response } from "express";
import { CreateVideo } from "./CreateVideo";

class CreateVideoController {
  async handle(req: Request, res: Response) {
    const { originalname: name, size, key } = req.file!;

    const createVideo = new CreateVideo();

    const video = await createVideo.execute({
      name,
      key,
      size,
    });

    return res.json(video);
  }
}

export { CreateVideoController };
