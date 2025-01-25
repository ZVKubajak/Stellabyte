import { useState } from "react";
import { Cross as HamburgerCross } from "hamburger-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="m-3">
      <header className="relative p-2 flex justify-between items-center">
        <div className="absolute inset-0 rounded-2xl bg-[#29323c] opacity-70"></div>

        <h1 className="relative z-10 text-[whitesmoke] text-xl p-0 m-0 opacity-100">
          Stellabyte
        </h1>

        <div className="relative z-10 opacity-100 p-0 m-0">
          <HamburgerCross
            toggled={isOpen}
            toggle={setIsOpen}
            color="whitesmoke"
          />
        </div>
      </header>
    </div>
  );
};

export default Header;