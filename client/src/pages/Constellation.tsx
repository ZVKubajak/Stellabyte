import { useLocation } from "react-router-dom";
import starAuth from "../utils/star";

const Constellation = () => {
  starAuth.deleteStarToken();
  const location = useLocation();
  const { fileSize, fileType } = location.state || {};
  return (
    <div className="pt-[100px]">
      <h1>{fileSize}</h1>
      <h1>{fileType}</h1>
    </div>
  );
};

export default Constellation;