"use client";
import React, { useState } from "react";
import Modal from "./modal";

interface BtnModalProps {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const BtnModal: React.FC<BtnModalProps> = ({ isOpen, setIsModalOpen }) => {
  return (
    <>
      <button
        className="inline-block px-4 py-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-blue-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25"
        onClick={() => setIsModalOpen(true)}
      >
        {" "}
        <i className="fas fa-plus"> </i>&nbsp;&nbsp;Add New Doctors
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default BtnModal;
