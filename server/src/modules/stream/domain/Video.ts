/* eslint-disable lines-between-class-members */
class Video {
  id?: string;
  name!: string;
  key!: string;
  size!: number;
  url?: string;

  private constructor({ name, key, size, url }: Video) {
    return Object.assign(this, {
      name,
      key,
      size,
      url,
    });
  }

  static create({ name, key, size, url }: Video) {
    const video = new Video({ name, key, size, url });
    return video;
  }
}

export { Video };
