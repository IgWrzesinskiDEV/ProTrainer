import { S3 } from "@aws-sdk/client-s3";
import { verifyAuth } from "../lucia/auth";
const s3 = new S3({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function saveAvatarImage(image: File, id: string) {
  const extenstion = image.name.split(".").pop();
  const fileName = `${id}.${extenstion}`;

  const bufferedImage = await image.arrayBuffer();
  const { user } = await verifyAuth();
  if (user?.profileDetails?.avatarFileName) {
    await s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: user.profileDetails.avatarFileName,
    });
  }

  s3.putObject({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: image.type,
  });
  return fileName;
}
