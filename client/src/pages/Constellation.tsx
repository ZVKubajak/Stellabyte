import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import starAuth from "../utils/star";
import {
  handleStarAmount,
  handleConvertArray,
  handleObjectConversion,
} from "../utils/helperFunctions";

interface IStar {
  x: number;
  y: number;
  color: string;
}

const Constellation = () => {
  const [star, setStar] = useState<IStar[]>([]);

  const location = useLocation();
  const { fileSize, fileType } = location.state || {};
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Draw black background on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  // Process star data
  useEffect(() => {
    starAuth.deleteStarToken();

    const everything = () => {
      return handleObjectConversion(
        handleConvertArray(handleStarAmount(fileSize))
      );
    };

    const finalStar = everything();
    setStar(finalStar);
  }, [fileSize]);

  return (
    <div className="mt-[100px] relative w-[200px] h-[200px]">
      {/* Canvas for background */}
      <canvas ref={canvasRef} width={300} height={400} />

      {/* Map over stars and render as divs */}
      {star.map((star, index) => (
        <div
          key={index}
          className={`absolute w-[1.5px] h-[1.5px] bg-${star.color}-300 rounded-full ring shadow-white`}
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            backgroundColor: star.color, // Use the star's color
            boxShadow: `10px 20px 50px 2px ${star.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default Constellation;
