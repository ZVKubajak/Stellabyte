import { useState, useEffect } from "react";
import { Cross as HamburgerCross } from "hamburger-react";
import authService from "../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <div className="m-3 z-999">
      <header
        className={`fixed top-3 w-[92%] flex flex-col justify-between items-center overflow-hidden rounded-2xl bg-[#13547a] transition-all duration-300 z-999 shadow-md ${
          isOpen ? "h-64" : "h-16"
        }`}
      >
        {/* Header content */}
        <div className="w-full flex justify-between items-center p-2">
          <h1 className="relative z-10 text-[whitesmoke] text-xl p-0 m-0">
            Stellabyte
          </h1>
          <div className="relative z-10">
            {authService.loggedIn() ? (
              <HamburgerCross
                toggled={isOpen}
                toggle={setIsOpen}
                color="whitesmoke"
              />
            ) : (
              <div className="mt-2">
              <button className="text-[whitesmoke] m-0 mb-1 py-1 px-2 border border-[whitesmoke] rounded" onClick={() => navigate('/signup')}>Sign Up</button>
              </div>

            )}
          </div>
        </div>

        {/* Expandable content with box shadow */}
        <div
          className={`w-full flex-grow flex flex-col items-center justify-center text-[whitesmoke] z-999 transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Add content here */}
        </div>
      </header>
    </div>
  );
};

export default Header;
