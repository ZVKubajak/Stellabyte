import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import starAuth from "../utils/star";
import {
  handleStarQuantity,
  handleConvertArray,
  handleObjectConversion,
  handleCenterStar,
} from "../utils/helperFunctions";

interface IStar {
  x: number;
  y: number;
  color: string;
}

interface ICenterStar {
  starSize: number;
  color: string;
}

const Constellation = () => {
  const [stars, setStars] = useState<IStar[]>([]);
  const [centerStar, setCenterStar] = useState<ICenterStar>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const location = useLocation();
  const { fileSize, fileType } = location.state || {};

  starAuth.deleteStarToken();

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
    const generateStars = () => {
      const amount = handleStarQuantity(fileSize);
      return handleObjectConversion(handleConvertArray(amount.starAmount));
    };

    const generateCenterStar = () => {
      return handleCenterStar(fileSize, fileType);
    };

    setStars(generateStars());
    setCenterStar(generateCenterStar());
  }, [fileSize, fileType]);

  return (
    <div className="mt-[100px] relative w-[200px] h-[200px]">
      {/* Canvas for background */}
      <canvas ref={canvasRef} width={300} height={400} />

      {/* Map over stars and render as divs */}
      {stars.map((star, index) => (
        <div
          key={index}
          className={`absolute w-[1.5px] h-[1.5px] bg-${star.color}-300 rounded-full`}
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            backgroundColor: star.color,
            boxShadow: `10px 20px 50px 2px ${star.color}`,
          }}
        />
      ))}

      {centerStar && (
        <div
          className="absolute rounded-full"
          style={{
            width: `${centerStar.starSize}px`,
            height: `${centerStar.starSize}px`,
            left: "150px",
            top: "200px",
            transform: "translate(-50%, -50%)",
            backgroundColor: centerStar.color,
            boxShadow: `0px 0px 12px 10px ${centerStar?.color}`,
          }}
        />
      )}
    </div>
  );
};

export default Constellation;
