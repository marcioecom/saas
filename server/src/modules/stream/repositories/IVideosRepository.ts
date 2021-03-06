/* eslint-disable no-unused-vars */
import { Video } from "../domain/Video";

export interface IVideosRepository {
  create(video: Video): Promise<Video>;
  findById(id: string): Promise<Video | null>;
  deleteById(id: string): Promise<Video | null>;
  showVideos(): Promise<Video[] | null>;
}
