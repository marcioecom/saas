/* eslint-disable no-unused-vars */
import { Request } from "express";
import multer, { FileFilterCallback, Options } from "multer";
import path from "path";
import crypto from "crypto";
import aws from "aws-sdk";
import multerS3 from "multer-s3";

const local = multer.diskStorage({
  destination: path.resolve(__dirname, "..", "tmp", "uploads"),
  filename: (req, file, cb) => {
    const hash = crypto.randomBytes(16);

    // eslint-disable-next-line no-param-reassign
    file.key = `${hash.toString("hex")}-${file.originalname}`;

    cb(null, file.key);
  },
});

const s3 = multerS3({
  s3: new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }),
  bucket: "vclick-raw-videos",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read",
  key: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err);

      const fileName = `${hash.toString("hex")}-${file.originalname}`;

      cb(null, fileName);
    });
  },
});

const upload: Options = {
  dest: path.resolve(__dirname, "..", "tmp", "uploads"),
  storage: local,
  fileFilter: (
    req: Request,
    // eslint-disable-next-line no-undef
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    // prettier-ignore
    const allowedMimes = [
      "image/png",
      "image/jpeg",
      "image/pjpeg",
      "image/gif",
      "image/jpeg",
      "video/mp4",
      "video/wmv",
      "video/mkv",
      "video/qt"
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
};

export { upload };
