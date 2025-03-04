import React from "react";
import Image from "next/image";

interface HeaderProps {
  onClearDataClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClearDataClick }) => {
  return (
    <header className="bg-white rounded-3xl shadow-sm mx-4 my-4 md:mx-auto md:my-6 max-w-7xl">
      <div className="px-4 py-3 md:px-6 md:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/static/imgs/proby-logo.svg"
              alt="Proby Logo"
              width={120}
              height={40}
              className="h-8 w-auto md:h-10"
            />
          </div>

          <button className="p-1 md:p-2" onClick={onClearDataClick}>
            <div className="w-7 h-5 flex flex-col justify-between">
              <span className="w-full h-0.5 bg-black"></span>
              <span className="w-full h-0.5 bg-black"></span>
              <span className="w-full h-0.5 bg-black"></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
