import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import Section from "../components/Section";
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      {/* first section */}
      <div className="flex flex-row mt-[150px] justify-between items-center mx-3">
        <div className="flex flex-col items-start">
          <h1 className="text-[whitesmoke] mb-3">
            Upload. Create. Illuminate Your Cloud Galaxy.
          </h1>
          {auth.loggedIn() ? (
            <button
              className="text-[whitesmoke] border p-2 rounded-xl cursor-pointer"
              onClick={() => navigate("/cloud-storage")}
            >
              Upload Now
            </button>
          ) : (
            <button
              className="text-[whitesmoke] border p-2 rounded-xl cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Get started
            </button>
          )}
        </div>
        <div className="flex">
          <FontAwesomeIcon
            className="testing text-[100px] text-[#286386] drop-shadow-md opacity-80 blur-[0.5px]"
            icon={faCloud}
          />
        </div>
      </div>

      {/* second section */}
      <div className="mt-[60px]">
        <div className="flex flex-col">
          <h1 className="text-center text-[whitesmoke] text-[24px] mb-[30px]">
            Up to 50MB
          </h1>
          <Section text="Our app offers 50MB of free cloud storage for your important files and star maps, ensuring a secure and efficient experience at no cost." />
        </div>
        <div className="flex flex-col mt-[80px]">
          <h1 className="text-center text-[whitesmoke] text-[24px] mb-[30px]">
            Cloud Storage
          </h1>
          <Section text="Access your files anytime, anywhere with secure cloud storage. Retrieve your data effortlessly, from any device." />
        </div>
        <div className="flex flex-col mt-[80px]">
          <h1 className="text-center text-[whitesmoke] text-[24px] mb-[30px]">
            Easy to use
          </h1>
          <Section text="Effortlessly store and access your files with our user-friendly cloud storage. Retrieve your data anytime, anywhere—simple, fast, and hassle-free." />
        </div>
      </div>

      {/* third section */}

      {!auth.loggedIn() ? (
        <div className="flex flex-col items-center mb-[100px]">
          <h1 className="text-center text-[whitesmoke] text-[24px] mt-[80px] mb-[30px]">
            Join now
          </h1>
          <button
            className="border border-[whitesmoke] w-1/2 border-[1px] text-[whitesmoke] p-2 rounded-xl cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Join and Upload
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center mb-[100px]">
          <h1 className="text-center text-[whitesmoke] text-[24px] mt-[80px] mb-[30px]">
            Upload and Create
          </h1>
          <button
            className="border border-[whitesmoke] w-1/2 border-[1px] text-[whitesmoke] p-2 rounded-xl cursor-pointer"
            onClick={() => navigate("/cloud-storage")}
          >
            Create Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
