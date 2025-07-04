const fileTypeColors = {
  text: "white",
  image: "cyan",
  application: "yellow",
  video: "cyan",
  audio: "purple",
  multipart: "white",
  font: "cyan",
  model: "yellow",
  haptics: "cyan",
  example: "purple",
  other: "green",
};

const valuesArray = Object.values(fileTypeColors);

export const handleStarQuantity = (fileSize: number) => {
  let starAmount: number;
  let centerStarSize: number;

  if (fileSize < 100000) {
    starAmount = Math.round(fileSize / 100);
    centerStarSize = 50;
  } else if (fileSize < 1000000) {
    starAmount = Math.round(fileSize / 1000);
    centerStarSize = 75;
  } else if (fileSize < 10000000) {
    starAmount = Math.round(fileSize / 10000);
    centerStarSize = 100;
  } else {
    starAmount = Math.round(fileSize / 100000);
    centerStarSize = 125;
  }

  return { starAmount, centerStarSize };
};

export const handleStarColor = (fileType: string) => {
  if (fileType.includes("text/")) {
    return fileTypeColors.text;
  } else if (fileType.includes("image/")) {
    return fileTypeColors.image;
  } else if (fileType.includes("application/")) {
    return fileTypeColors.application;
  } else if (fileType.includes("video/")) {
    return fileTypeColors.video;
  } else if (fileType.includes("audio/")) {
    return fileTypeColors.audio;
  } else if (fileType.includes("multipart/")) {
    return fileTypeColors.multipart;
  } else if (fileType.includes("font/")) {
    return fileTypeColors.font;
  } else if (fileType.includes("model/")) {
    return fileTypeColors.model;
  } else if (fileType.includes("haptics/")) {
    return fileTypeColors.haptics;
  } else if (fileType.includes("example/")) {
    return fileTypeColors.example;
  } else {
    return fileTypeColors.other;
  }
};

export const handleConvertArray = (convertedFileSize: number) => {
  const array = [];

  for (let i = 0; i <= convertedFileSize; i++) {
    array.push(i);
  }

  return array;
};

export const handleObjectConversion = (arr: number[]) => {
  const objArray = [];

  for (let i = 0; i < arr.length; i++) {
    objArray.push({
      x: Math.floor(Math.random() * 300),
      y: Math.floor(Math.random() * 400),
      color: valuesArray[Math.floor(Math.random() * valuesArray.length)],
    });
  }

  return objArray;
};

export const handleCenterStar = (fileSize: number, fileType: string) => {
  const size = handleStarQuantity(fileSize);
  const color = handleStarColor(fileType);
  const starSize = size.centerStarSize;

  return { starSize, color };
};
