const fileTypeColors = {
  text: "white",
  image: "yellow",
  application: "sky",
  video: "red",
  audio: "orange",
  multipart: "green",
  font: "purple",
  model: "emerald",
  haptics: "rose",
  example: "blue",
  other: "gray",
};

const valuesArray = Object.values(fileTypeColors);

export const handleStarAmount = (fileSize: number) => {
  if (fileSize < 100000) {
    return Math.round(fileSize / 10);
  } else if (fileSize < 1000000) {
    return Math.round(fileSize / 100);
  } else if (fileSize < 10000000) {
    return Math.round(fileSize / 1000);
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
      x: Math.floor(Math.random() * 200),
      y: Math.floor(Math.random() * 200),
      color: valuesArray[Math.floor(Math.random() * valuesArray.length)],
    });
  }
  return objArray;
};
