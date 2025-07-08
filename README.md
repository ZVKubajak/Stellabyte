 # Stellabyte

## Description
Stellabyte is a cloud storage platform built on Amazon S3 and Prisma + MongoDB. User's can store files while turning them into artwork with a celestial aesthetic.

## Table of Contents
- [Usage](#usage)
- [Installation](#installation)
- [Questions](#questions)
- [Credits](#credits)

## Usage
Checkout the deployed site at [https://stellabyte-production.up.railway.app](https://stellabyte-production.up.railway.app). Create an account and upload files up to 50MB each to the cloud. When the upload process is finished, users can view their file's generated artwork.

Each artwork contains a bunch of colorful little stars and one big center star. The center star's color is determined by the uploaded file's MIME type, and the size is determined by the file's size. Each little star also represents part of the file's size, but the colors are random. The nebulas are randomly generated.

Users can also download the files they uploaded at any time, or delete them from the cloud storage.

## Home Page
![image](https://github.com/user-attachments/assets/74cef2cd-4588-4f5d-a54d-ac608fe6d3cf)

## Upload Page
![image](https://github.com/user-attachments/assets/d2987a13-e341-4dd5-b690-f4376c5fb1bd)

## Constellation Page
![image](https://github.com/user-attachments/assets/3030f490-fb26-4161-ac39-c01c8cd7bf33)

## Installation
You will need the following ENV variables:
```
ACCESS_KEY (AWS S3)
SECRET_ACCESS_KEY (AWS S3)
BUCKET_NAME (AWS S3)
DATABASE_URL (for Prisma)
JWT_SECRET_KEY
PORT
```

Quickstart:
```
git clone git@github.com:ZVKubajak/Stellabyte.git
cd Stellabyte/
npm i
npm run start:dev
```

Make sure to change out the Axios base URLs for `/api` and `/auth` in the client:
```
/client/src/services/api.ts & /client/src/services/authServices.ts

const api: AxiosInstance = axios.create({
  baseURL: "https://stellabyte-production.up.railway.app/api", // Change this
  timeout: 60000,
});

=====

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:<YOUR PORT>/api", // To this
  timeout: 60000,
});
```

## Questions
If you have any questions, you can reach out to the team at [zvkubajak@gmail.com](mailto:zvkubajak@gmail.com) and [bryceberczik.dev@gmail.com](mailto:bryceberczik.dev@gmail.com).

## Credits
Created by Zander Kubajak and Bryce Berczik.

- [ZVKubajak](https://github.com/ZVKubajak)
- [bryceberczik](https://github.com/bryceberczik)

© 2025 Stellabyte. All rights reserved.
