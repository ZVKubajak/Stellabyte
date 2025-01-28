import AWS from "../config/awsConfig";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3();
const bucket = process.env.BUCKET_NAME!;

const deleteFolder = async (id: string) => {
  try {
    const prefix = `${id}/`;
    const listParams = {
      Bucket: bucket,
      Prefix: prefix,
    };

    const listedObjects = await s3.listObjectsV2(listParams).promise();
    if (listedObjects.Contents && listedObjects.Contents.length > 0) {
      const deleteParams = {
        Bucket: bucket,
        Delete: {
          Objects: listedObjects.Contents.map((obj) => ({ Key: obj.Key! })),
          Quiet: true,
        },
      };

      await s3.deleteObjects(deleteParams).promise();
    }
  } catch (error) {
    console.error("Error deleting user S3 folder:", error);
  }
};

export default deleteFolder;
