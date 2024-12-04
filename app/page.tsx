/* eslint-disable @next/next/no-img-element */
"use client";

export default function Home() {
  return (
    <div className="w-full bg-[#1a1a3e] text-[#FF7737] min-h-screen">
      <div className="px-14 py-24">
        <img
          src="./static/logo-original.svg"
          alt="logo"
          className="w-[40%] h-auto"
        />
      </div>
    </div>
  );
}
