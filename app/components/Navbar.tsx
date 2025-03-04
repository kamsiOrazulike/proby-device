"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    if (menuButtonRef.current) {
      gsap.to(menuButtonRef.current.children, {
        rotate: isMenuOpen ? 0 : 90,
        opacity: 1,
        duration: 0.3,
        stagger: 0.1,
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-50 px-4 pt-6">
      <nav
        ref={navRef}
        className="w-full max-w-3xl bg-white/90 backdrop-blur-md text-black rounded-full shadow-lg px-6 py-3 border border-gray-100"
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/static/UX/logo-white.svg"
              width={120}
              height={40}
              alt="logo"
              priority
              className="invert"
            />
          </Link>

          <div className="md:hidden relative">
            <button
              ref={menuButtonRef}
              onClick={handleMenuToggle}
              className="focus:outline-none"
            >
              <div className="space-y-2">
                <span
                  className={`block w-6 h-0.5 bg-black transform transition duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-black transform transition duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-black transform transition duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                  }`}
                ></span>
              </div>
            </button>

            {isMenuOpen && (
              <div className="z-50 absolute right-0 top-full mt-4 min-w-[200px]">
                <div className="w-full flex flex-col justify-between gap-2 text-sm font-medium bg-white rounded-2xl p-4 shadow-lg">
                  <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className={`uppercase px-4 py-2 rounded-full text-right transition-all duration-150 ${
                      pathname === "/"
                        ? "text-white bg-black"
                        : "text-black hover:bg-black/5"
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={`uppercase px-4 py-2 rounded-full text-right transition-all duration-150 ${
                      pathname === "/dashboard"
                        ? "text-white bg-black"
                        : "text-black hover:bg-black/5"
                    }`}
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:flex">
            <div className="flex gap-4 text-sm">
              <Link
                href="/"
                className={`uppercase tracking-wide px-6 py-2 rounded-full transition-all duration-300 ${
                  pathname === "/"
                    ? "text-white bg-black font-medium"
                    : "text-black hover:bg-black/5"
                }`}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className={`uppercase tracking-wide px-6 py-2 rounded-full transition-all duration-300 ${
                  pathname === "/dashboard"
                    ? "text-white bg-black font-medium"
                    : "text-black hover:bg-black/5"
                }`}
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
