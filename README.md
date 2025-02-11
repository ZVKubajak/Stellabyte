 # Stellabyte

## Description
Stellabyte is a next-generation cloud storage platform built on Amazon S3 for scalable storage and Prisma ORM for efficient database management, combining cutting-edge technology with a celestial aesthetic. Custom cosmic-themed artwork transforms file management into an immersive, out-of-this-world experience, blending functionality and creativity for storing memories or organizing documents.

## Table of Contents
- [Usage](#usage)
- [Installation](#installation)
- [Questions](#questions)
- [Credits](#credits)

## Usage
Checkout the deployed site at [https://stellabyte-production.up.railway.app](https://stellabyte-production.up.railway.app). Create an account and upload a file up to 50MB to the cloud. When the upload process is finished, users can view their file's generated artwork.

Each artwork contains a bunch of colorful little stars and one big center star. The center star's color is determined by the uploaded file's MIME type, and the size is determined by the file size. Each little star also represents part of the file size, but the color is random. The nebulas are randomly generated.

Users can also download the files they uploaded at any time, or delete them from the cloud storage.

## Home Page
![image](https://github.com/user-attachments/assets/74cef2cd-4588-4f5d-a54d-ac608fe6d3cf)

## Upload Page
![image](https://github.com/user-attachments/assets/d2987a13-e341-4dd5-b690-f4376c5fb1bd)

## Constellation Page
![image](https://github.com/user-attachments/assets/3030f490-fb26-4161-ac39-c01c8cd7bf33)

## Installation
Requirements:
* npm v10.9.2
* MongoDB Database URL
* Port Number
* Access Key (S3)
* Secret Access Key (S3)
* Bucket Name (S3)
* JWT Secret Key

To install the source code for **Stellabyte**, clone the repository locally using `git clone git@github.com:ZVKubajak/Stellabyte.git` and navigate to the project directory with `cd Stellabyte`.

Install all dependencies by running `npm run install`. Navigate to the server with `cd server`, and create a .env file with variables `DATABASE_URL`, `PORT`, `ACCESS_KEY`, `SECRET_ACCESS_KEY`, `BUCKET_NAME`, and `JWT_SCRET_KEY`. Add the requirements respectively.

Navigate back to the root of the project with `cd ..`. You might also need to add localhost prefixes in front of the client endpoints. Then start the development server with `npm run start:dev`. You're now ready to explore and use the app locally!

## Questions
If you have any questions, you can reach out to the team at [zvkubajak@gmail.com](mailto:zvkubajak@gmail.com) and [bryceberczik.dev@gmail.com](mailto:bryceberczik.dev@gmail.com).

## Credits
Created by Zander Kubajak and Bryce Berczik.

- [ZVKubajak](https://github.com/ZVKubajak)
- [bryceberczik](https://github.com/bryceberczik)

© 2025 Stellabyte. All rights reserved.
