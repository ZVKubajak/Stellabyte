import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
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
  const [centerStar, setCenterStar] = useState<ICenterStar | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const location = useLocation();
  const { fileSize = 1000, fileType = "unknown" } = location.state || {};

  starAuth.deleteStarToken();

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const nebulaColors = [
      "rgba(100, 0, 255, 0.2)",
      "rgba(255, 20, 147, 0.3)",
      "rgba(0, 191, 255, 0.2)",
      "rgba(255, 105, 180, 0.25)",
      "rgba(138, 43, 226, 0.3)",
    ];

    nebulaColors.forEach((color) => {
      ctx.fillStyle = color;
      ctx.filter = "blur(50px)";
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        100,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });

    ctx.filter = "none";

    stars.forEach((star) => {
      ctx.shadowColor = star.color;
      ctx.shadowBlur = Math.random() * 8 + 2;
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    if (centerStar) {
      const gradient = ctx.createRadialGradient(
        150,
        200,
        0,
        150,
        200,
        centerStar.starSize
      );
      gradient.addColorStop(0, centerStar.color);
      ctx.fillStyle = gradient;
      ctx.shadowColor = centerStar.color;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(150, 200, centerStar.starSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [stars, centerStar]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "constellation.png";
      link.click();
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen mb-[100px]">
      <div className="flex flex-col items-center mt-[200px]">
        {/* Canvas for background and stars */}
        <div className="relative testing">
          <canvas
            ref={canvasRef}
            width={300}
            height={400}
            className="rounded-[10px] cursor-pointer"
          />
        </div>{" "}
        {/* Paragraph tag below the canvas */}
        <p className="mt-4 text-center text-gray-300 mx-3 xl:text-[22px]">
          <strong>Your File's Constellation!</strong> <br />
          Small stars represent file size, while the <strong>
            big star
          </strong>{" "}
          signifies file type. Together, they form a unique digital
          constellation.
        </p>
        <button
          className="text-[whitesmoke] border py-2 px-4 rounded shadow mt-2"
          onClick={handleDownload}
        >
          Download Art
        </button>
        <Link className="text-[whitesmoke] mt-4" to="/">
          Take me home
        </Link>
      </div>
    </div>
  );
};

export default Constellation;
