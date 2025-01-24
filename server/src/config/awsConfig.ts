import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const awsConfig = AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

export default awsConfig;
