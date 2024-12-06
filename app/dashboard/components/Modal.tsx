"use client";
import { ConfirmModalProps } from "../../types";
import React from "react";

export const Modal = ({
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

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#1a1a3e] border border-gray-600 rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
        <p className="text-gray-300 mb-8">{message}</p>
        <div className="flex flex-col">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 border border-red-500 text-white rounded hover:bg-red-500 transition-all duration-150 mb-2"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="text-xs px-4 py-2 text-gray-300 hover:text-white transition-all duration-150"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
