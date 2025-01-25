import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className="flex flex-row mt-[100px] mx-3">
      <div className="flex flex-col items-start">
        <h1 className="text-[whitesmoke] mb-3">
          Cloud Storage for all your needs
        </h1>
        <button className="text-gray-300 border p-2 rounded-3xl cursor-pointer">
          Get started
        </button>
      </div>
      <div>
        <FontAwesomeIcon
          className="text-[100px] text-gray-400 drop-shadow-md opacity-80 blur-[0.5px]"
          icon={faCloud}
        />
      </div>
    </div>
  );
};

export default Home;
