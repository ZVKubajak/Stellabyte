import { useState, useEffect } from "react";
import { Cross as HamburgerCross } from "hamburger-react";
import auth from "../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";
import BrandLogo from "../../public/logo/brandlogo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleLogout = () => {
    auth.logout();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="fixed top-3 px-3 left-1/2 transform -translate-x-1/2 w-full z-999">
      <header
        className={`relative flex flex-col justify-between items-center overflow-hidden rounded-2xl transition-all duration-300 z-999 ${
          isOpen ? "h-[200px] lg:h-[130px]" : "h-16"
        }`}
      >
        <div className="absolute inset-0 glass z-0"></div>

        {/* Header content */}
        <div className="relative z-10 w-full flex justify-between items-center xl:mt-1 p-2">
          <img
            src={BrandLogo}
            alt="Our apps brand logo"
            width={125}
            className="relative z-10 ml-2 blur-none cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="hidden xl:block xl:flex xl:flex-row xl:gap-[100px]">
            <h1
              onClick={() => (window.location.href = "/upload")}
              className="text-[20px] text-[whitesmoke] cursor-pointer lg:m-0"
            >
              Upload
            </h1>
            <h1
              onClick={() => (window.location.href = "/storage")}
              className="text-[20px] text-[whitesmoke] cursor-pointer lg:m-0"
            >
              Storage
            </h1>
            <h1
              onClick={() => (window.location.href = "/support")}
              className="text-[20px] text-[whitesmoke] cursor-pointer lg:m-0"
            >
              Support
            </h1>
            <h1
              onClick={() => (window.location.href = "/settings")}
              className="text-[20px] text-[whitesmoke] cursor-pointer lg:m-0"
            >
              Settings
            </h1>
          </div>
          <div className="hidden xl:block">
            {auth.loggedIn() ? (
              <h1
                className="text-[20px] cursor-pointer text-[whitesmoke] lg:m-0 xl:mr-3"
                onClick={() => handleLogout()}
              >
                Log Out
              </h1>
            ) : (
              <div className="mr-3">
                <button
                  className="text-[whitesmoke] m-0 py-1 px-2 border border-[whitesmoke] rounded"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
          <div className="relative z-10 xl:hidden">
            {auth.loggedIn() ? (
              <HamburgerCross
                toggled={isOpen}
                toggle={setIsOpen}
                color="whitesmoke"
              />
            ) : (
              <div className="mt-2">
                <button
                  className="text-[whitesmoke] m-0 mb-1 py-1 px-2 border border-[whitesmoke] rounded"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Expandable content with box shadow */}
        <div
          className={`w-full flex-grow flex flex-row z-10 justify-evenly lg:justify-center lg:gap-3 text-[whitesmoke] pb-4 mt-3 z-999 transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-3">
            <h1
              onClick={() => (window.location.href = "/")}
              className="text-[20px] cursor-pointer lg:m-0"
            >
              Home
            </h1>
            <div className="w-px bg-[whitesmoke] hidden lg:block">‎ </div>
            <h1
              onClick={() => (window.location.href = "/upload")}
              className="text-[20px] cursor-pointer lg:m-0"
            >
              Upload
            </h1>
            <div className="w-px bg-[whitesmoke] hidden lg:block">‎ </div>
            <h1
              onClick={() => (window.location.href = "/storage")}
              className="text-[20px] cursor-pointer lg:m-0"
            >
              Storage
            </h1>
          </div>
          <div className="w-px bg-[whitesmoke]"></div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-3">
            <h1
              onClick={() => (window.location.href = "/support")}
              className="text-[20px] cursor-pointer lg:m-0"
            >
              Support
            </h1>
            <div className="w-px bg-[whitesmoke] hidden lg:block">‎ </div>
            <h1
              onClick={() => (window.location.href = "/settings")}
              className="text-[20px] cursor-pointer lg:m-0"
            >
              Settings
            </h1>
            <div className="w-px bg-[whitesmoke] hidden lg:block">‎ </div>
            <h1
              className="text-[20px] cursor-pointer lg:m-0"
              onClick={() => handleLogout()}
            >
              Log Out
            </h1>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
