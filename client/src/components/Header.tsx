import { useState } from "react";
import { Cross as HamburgerCross } from "hamburger-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <HamburgerCross
              toggled={isOpen}
              toggle={setIsOpen}
              color="whitesmoke"
            />
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
