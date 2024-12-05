/* eslint-disable @next/next/no-img-element */
"use client";

export default function Home() {
  return (
    <div className="w-full bg-hero-1 bg-cover bg-no-repeat bg-[bottom_center] text-[#FF7737] min-h-screen flex items-center justify-center">
      <div className="px-14">
        <img
          src="./static/UX/logo-dark.svg"
          alt="logo"
          className="w-[40%] h-auto mx-auto"
        />
      </div>
    </div>
  );
}
