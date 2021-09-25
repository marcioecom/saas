import * as fs from "fs";
import * as AWS from "aws-sdk";
import { ManagedUpload } from "aws-sdk/lib/s3/managed_upload";

const BUCKET_NAME = "vclick-raw-videos";
const IAM_USER_KEY = process.env.AWS_ACCESS_KEY;
const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;

const s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
});

export function uploadToS3(fileName: string): Promise<any> {
  const readStream = fs.createReadStream(fileName);

  const params = {
    Bucket: BUCKET_NAME,
    Key: `myapp/${fileName}`,
    Body: readStream,
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (err: Error, data: ManagedUpload.SendData) => {
      readStream.destroy();

      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}
