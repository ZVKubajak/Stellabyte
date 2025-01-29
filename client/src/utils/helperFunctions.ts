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

export const handleStarAmount = (fileSize: number) => {
  if (fileSize < 100000) {
    return Math.round(fileSize / 100);
  } else if (fileSize < 1000000) {
    return Math.round(fileSize / 1000);
  } else if (fileSize < 10000000) {
    return Math.round(fileSize / 10000);
  } else {
    return Math.round(fileSize / 10000);
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
