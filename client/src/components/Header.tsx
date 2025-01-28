import { useState, useEffect } from "react";
import { Cross as HamburgerCross } from "hamburger-react";
import auth from "../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";

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
        className={`fixed top-3 w-[92%] flex flex-col justify-between items-center overflow-hidden rounded-2xl bg-[#13547a] transition-all duration-300 z-999 shadow-md ${
          isOpen ? "h-[200px]" : "h-16"
        }`}
      >
        {/* Header content */}
        <div className="w-full flex justify-between items-center p-2">
          <h1
            onClick={() => navigate("/")}
            className="relative z-10 text-[whitesmoke] text-xl p-0 m-0"
          >
            Stellabyte
          </h1>
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
          className={`w-full flex-grow flex flex-row justify-evenly text-[whitesmoke] pb-4 mt-3 z-999 transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-en">
            <h1
              onClick={() => (window.location.href = "/")}
              className="text-[20px]"
            >
              Home
            </h1>
            <h1
              onClick={() => (window.location.href = "/upload")}
              className="text-[20px]"
            >
              Upload
            </h1>
            <h1
              onClick={() => (window.location.href = "/storage")}
              className="text-[20px]"
            >
              Storage
            </h1>
          </div>
          <div className="w-px bg-[whitesmoke]"></div>
          <div className="flex flex-col items-start">
            <h1
              onClick={() => (window.location.href = "/support")}
              className="text-[20px]"
            >
              Support
            </h1>
            <h1
              onClick={() => (window.location.href = "/settings")}
              className="text-[20px]"
            >
              Settings
            </h1>
            <h1 className="text-[20px]" onClick={() => handleLogout()}>
              Log Out
            </h1>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
