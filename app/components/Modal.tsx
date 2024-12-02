"use client";
import React from "react";

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed w-full inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#36357F] p-6 rounded-lg w-[90%] max-w-[825px]">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-white hover:text-gray-300">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
