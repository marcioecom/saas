import { Request, Response } from "express";
import { GetProfile } from "./GetProfile";

class GetProfileController {
  // eslint-disable-next-line no-unused-vars
  constructor(private getProfile: GetProfile) {}

  async handle(req: Request, res: Response) {
    const { user_id } = req;

    try {
      const userInfos = await this.getProfile.execute(user_id);

      return res.json(userInfos);
    } catch (error) {
      return res.json(error);
    }
  }
}

export { GetProfileController };
