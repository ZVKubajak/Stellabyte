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
    <div className="m-3 z-999">
      <header
        className={`fixed top-3 w-[92%] flex flex-col justify-between items-center overflow-hidden rounded-2xl transition-all duration-300 z-999 ${
          isOpen ? "h-[200px]" : "h-16"
        }`}
      >
        <div className="absolute inset-0 glass z-0"></div>

        {/* Header content */}
        <div className="relative z-10 w-full flex justify-between items-center p-2">
          <img src={BrandLogo} alt="Our apps brand logo" width={125} className="relative z-10 ml-2 blur-none" onClick={() => navigate("/")}/>
          <div className="relative z-10">
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
          className={`w-full flex-grow flex flex-row z-10 justify-evenly text-[whitesmoke] pb-4 mt-3 z-999 transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-en">
            <h1
              onClick={() => (window.location.href = "/")}
              className="text-[20px] cursor-pointer"
            >
              Home
            </h1>
            <h1
              onClick={() => (window.location.href = "/upload")}
              className="text-[20px] cursor-pointer"
            >
              Upload
            </h1>
            <h1
              onClick={() => (window.location.href = "/storage")}
              className="text-[20px] cursor-pointer"
            >
              Storage
            </h1>
          </div>
          <div className="w-px bg-[whitesmoke]"></div>
          <div className="flex flex-col items-start">
            <h1
              onClick={() => (window.location.href = "/support")}
              className="text-[20px] cursor-pointer"
            >
              Support
            </h1>
            <h1
              onClick={() => (window.location.href = "/settings")}
              className="text-[20px] cursor-pointer"
            >
              Settings
            </h1>
            <h1 className="text-[20px] cursor-pointer" onClick={() => handleLogout()}>
              Log Out
            </h1>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
