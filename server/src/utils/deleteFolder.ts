import s3Client from "../config/awsConfig";
import { ListObjectsCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";

const bucket = process.env.BUCKET_NAME!;

const deleteFolder = async (id: string) => {
  try {
    const listCommand = new ListObjectsCommand({
      Bucket: bucket,
      Prefix: id + "/",
    });

    const listedObjects = await s3Client.send(listCommand);
    if (listedObjects.Contents && listedObjects.Contents.length > 0) {
      const deleteCommand = new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: {
          Objects: listedObjects.Contents.map((object) => ({
            Key: object.Key!,
          })),
        },
      });

      await s3Client.send(deleteCommand);
    }
  } catch (error) {
    console.error(`Error deleting user-${id}'s S3 folder:`, error);
    throw error;
  }
};

export default deleteFolder;
