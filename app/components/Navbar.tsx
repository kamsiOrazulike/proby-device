"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="z-50 fixed w-full bg-black/10 backdrop-blur-sm p-3 md:p-6 text-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between md:justify-start relative">
          <Link href="/" className="flex items-center">
            <Image
              src="/static/UX/logo-white.svg"
              width={150}
              height={150}
              alt="logo"
              priority
            />
          </Link>

          <div className="md:hidden relative">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="space-y-2">
                <span
                  className={`block w-8 h-0.5 bg-white transform transition duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                  }`}
                ></span>
                <span
                  className={`block w-8 h-0.5 bg-white transform transition duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-8 h-0.5 bg-white transform transition duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                  }`}
                ></span>
              </div>
            </button>

            {isMenuOpen && (
              <div className="z-50 absolute right-0 top-full mt-4 min-w-[200px]">
                <div className="w-full flex flex-col justify-between gap-2 text-sm font-bold">
                  <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className={`uppercase px-4 py-2 rounded-full text-right transition-colors duration-150 ${
                      pathname === "/"
                        ? "text-white"
                        : "text-white/20 hover:text-white"
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className={`uppercase px-4 py-2 rounded-full text-right transition-colors duration-150 ${
                      pathname === "/about"
                        ? "text-white"
                        : "text-white/20 hover:text-white"
                    }`}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={`uppercase px-4 py-2 rounded-full text-right transition-colors duration-150 ${
                      pathname === "/dashboard"
                        ? "text-white"
                        : "text-white/20 hover:text-white"
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
                className={`uppercase tracking-wide px-4 py-2 rounded-full transition-colors duration-150 ${
                  pathname === "/about"
                    ? "text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                About Us
              </Link>
              <Link
                href="/dashboard"
                className={`uppercase tracking-wide px-4 py-2 rounded-full transition-colors duration-150 ${
                  pathname === "/dashboard"
                    ? "text-white"
                    : "text-white/40 hover:text-white"
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
