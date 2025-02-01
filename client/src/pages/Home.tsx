import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import Section from "../components/Section";
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:mx-[100px] xl:items-center 2xl:items-stretch">
      {/* first section */}
      <div className="flex flex-row mt-[150px] justify-between items-center mx-3 2xl:justify-evenly">
        <div className="flex flex-col items-start">
          <h1 className="text-[whitesmoke] mb-3 md:text-[38px] lg:text-[35px] lg:w-4/5 xl:text-[40px] xl:w-3/5 2xl:text-[50px]">
            Upload. Create. Illuminate Your Cloud Galaxy.
          </h1>
          {auth.loggedIn() ? (
            <button
              className="text-[whitesmoke] border p-2 rounded-xl cursor-pointer sm:text-lg md:text-xl lg:text-[20px] xl:text-[23px]"
              onClick={() => navigate("/upload")}
            >
              Upload Now
            </button>
          ) : (
            <button
              className="text-[whitesmoke] border p-2 rounded-xl cursor-pointer sm:text-lg md:text-xl lg:text-[20px] xl:text-[23px] 2xl:text-[28px]"
              onClick={() => navigate("/signup")}
            >
              Get started
            </button>
          )}
        </div>
        <div className="flex">
          <FontAwesomeIcon
            className="testing text-[100px] text-[#1b2d47] drop-shadow-md opacity-80 blur-[0.5px] sm:text-[120px] md:text-[130px] xl:text-[135px] 2xl:text-[160px]"
            icon={faCloud}
          />
        </div>
      </div>

      {/* second section */}
      <div className="mt-[60px] xl:mt-[130px] xl:flex xl:items-center 2xl:mt-[200px] 2xl:mx-auto">
        <div className="flex flex-col">
          <h1 className="text-center text-[whitesmoke] text-[24px] mb-[30px] sm:text-[27px]">
            Up to 50MB
          </h1>
          <Section text="Our app offers 50MB of free cloud storage for your important files and star maps, ensuring a secure and efficient experience at no cost." />
        </div>
        <div className="flex flex-col mt-[80px] xl:mt-0">
          <h1 className="text-center text-[whitesmoke] text-[24px] mb-[30px] sm:text-[27px]">
            Cloud Storage
          </h1>
          <Section text="Access your files anytime, anywhere with secure cloud storage. Retrieve your data effortlessly, from any device." />
        </div>
        <div className="flex flex-col mt-[80px] xl:mt-0">
          <h1 className="text-center text-[whitesmoke] text-[24px] mb-[30px] sm:text-[27px]">
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
            className="border border-[whitesmoke] w-1/2 border-[1px] text-[whitesmoke] p-2 rounded-xl cursor-pointer sm:text-xl sm:w-1/3 md:text-2xl xl:w-full 2xl:w-1/5"
            onClick={() => navigate("/signup")}
          >
            Join and Upload
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center mb-[100px]">
          <h1 className="text-center text-[whitesmoke] text-[24px] mt-[80px] mb-[30px] 2xl:mt-[120px]">
            Upload and Create
          </h1>
          <button
            className="border border-[whitesmoke] w-1/2 border-[1px] text-[whitesmoke] p-2 rounded-xl cursor-pointer sm:text-xl sm:w-1/3 md:text-2xl xl:w-full 2xl:w-1/5"
            onClick={() => navigate("/upload")}
          >
            Create Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
