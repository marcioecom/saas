import { prisma } from "../../database/prisma";

interface IVideoRequest {
  name: string;
  key: string;
  size: number;
  url?: string;
}

class CreateVideo {
  async execute({ name, key, size, url }: IVideoRequest) {
    if (!url) {
      // eslint-disable-next-line no-param-reassign
      url = `${process.env.APP_URL}/videos/${key}`;
    }

    const video = await prisma.video.create({
      data: {
        name,
        key,
        size,
        url,
      },
    });

    return video;
  }
}

export { CreateVideo };
