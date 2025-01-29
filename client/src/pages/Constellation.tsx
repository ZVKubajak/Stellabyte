import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import starAuth from "../utils/star";
import {
  handleStarAmount,
  handleConvertArray,
  handleObjectConversion,
} from "../utils/helperFunctions";

const Constellation = () => {
  const [star, setStar] = useState([]);

  starAuth.deleteStarToken();
  const location = useLocation();

  const { fileSize, fileType } = location.state || {};

  const everything = () => {
    return handleObjectConversion(
      handleConvertArray(handleStarAmount(fileSize))
    );
  };

  useEffect(() => {
    const finalStar = everything();
    setStar(finalStar);
  }, [everything]);

  return (
    <div className="mt-[100px]">
      <canvas width={200} height={200}>123</canvas>
    </div>
  );
};

export default Constellation;
