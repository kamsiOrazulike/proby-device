"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#36357F] text-[#FF7737] w-full relative">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between md:justify-start relative">
          <Link href="/" className="flex items-center">
            <Image
              src="/static/logo-original.svg"
              width={100}
              height={100}
              alt="logo"
              priority
            />
          </Link>

          <div className="md:hidden relative">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="space-y-2">
                <span
                  className={`block w-8 h-0.5 bg-[#FF7737] transform transition duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                  }`}
                ></span>
                <span
                  className={`block w-8 h-0.5 bg-[#FF7737] transform transition duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-8 h-0.5 bg-[#FF7737] transform transition duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                  }`}
                ></span>
              </div>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 min-w-[150px] z-50">
                <div className="flex flex-col gap-2">
                  <Link
                    href="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-2 rounded-full text-right transition-colors duration-150 ${
                      pathname === "/about"
                        ? "text-[#FF7737]"
                        : "text-[#FF7737]/20 hover:text-[#FF7737]"
                    }`}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-2 rounded-full text-right transition-colors duration-150 ${
                      pathname === "/dashboard"
                        ? "text-[#FF7737]"
                        : "text-[#FF7737]/20 hover:text-[#FF7737]"
                    }`}
                  >
                    Dashboard (Demo)
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex gap-1">
              <Link
                href="/about"
                className={`px-4 py-2 rounded-full transition-colors duration-150 ${
                  pathname === "/about"
                    ? "text-[#FF7737]"
                    : "text-[#FF7737]/20 hover:text-[#FF7737]"
                }`}
              >
                About Us
              </Link>
              <Link
                href="/dashboard"
                className={`px-4 py-2 rounded-full transition-colors duration-150 ${
                  pathname === "/dashboard"
                    ? "text-[#FF7737]"
                    : "text-[#FF7737]/20 hover:text-[#FF7737]"
                }`}
              >
                Dashboard (Demo)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
