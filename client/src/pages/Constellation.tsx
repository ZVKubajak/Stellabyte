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
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modalCanvasRef = useRef<HTMLCanvasElement | null>(null);

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

  // Redraw canvas content in modal
  useEffect(() => {
    if (isModalOpen && modalCanvasRef.current) {
      const modalCanvas = modalCanvasRef.current;
      const ctx = modalCanvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, modalCanvas.width, modalCanvas.height);
      }
    }
  }, [isModalOpen]);

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

  // Handle canvas click to open modal
  const handleCanvasClick = () => {
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center relative w-full h-screen">
      <div className="flex flex-col items-center">
        {/* Canvas for background */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={300}
            height={400}
            className="rounded-[10px] cursor-pointer"
            onClick={handleCanvasClick} // Open modal on click
          />

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

        {/* Paragraph tag below the canvas */}
        <p className="mt-4 text-center text-gray-300 mx-3">
          <strong>Your File's Constellations!</strong> <br />
          Each tiny star represents your file's size, while the{" "}
          <strong>big star</strong> shines as the file type, shaped by its
          overall weight. Together, they create a unique digital constellation.
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50"
          onClick={handleCloseModal} // Close modal on background click
        >
          <div className="relative">
            <canvas
              ref={modalCanvasRef}
              width={450} // Slightly larger canvas size
              height={600}
              className="rounded-[10px]"
            />
            {/* Map over stars and render as divs */}
            {stars.map((star, index) => (
              <div
                key={index}
                className={`absolute w-[2px] h-[2px] bg-${star.color}-300 rounded-full`}
                style={{
                  left: `${star.x * 1.5}px`, // Scale positions for larger canvas
                  top: `${star.y * 1.5}px`,
                  backgroundColor: star.color,
                  boxShadow: `10px 20px 50px 2px ${star.color}`,
                }}
              />
            ))}

            {centerStar && (
              <div
                className="absolute rounded-full"
                style={{
                  width: `${centerStar.starSize * 1.5}px`, // Scale center star size
                  height: `${centerStar.starSize * 1.5}px`,
                  left: "225px", // Adjusted for larger canvas
                  top: "300px",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: centerStar.color,
                  boxShadow: `0px 0px 18px 15px ${centerStar?.color}`, // Enhanced glow
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Constellation;