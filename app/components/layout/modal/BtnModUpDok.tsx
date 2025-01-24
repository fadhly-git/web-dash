"use client";
import React, { useState } from "react";
import Modal from "./MdlUpDok";

interface Dokter {
  id_dokter: number;
  Nama_Dokter: string;
  Foto_Dokter?: string;
  Jenis_Spesialis: string;
}

interface BtnModalProps {
  dokter: Dokter;
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const BtnModalUp: React.FC<BtnModalProps> = ({
  dokter,
  isOpen,
  setIsModalOpen,
}) => {
  return (
    <>
      <button
        className="inline-block px-4 py-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-green-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25"
        onClick={() => setIsModalOpen(true)}
      >
        {" "}
        <i className="fas fa-plus"> </i>&nbsp;&nbsp;Edit
      </button>
      <Modal
        dokter={dokter}
        isOpen={isOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default BtnModalUp;
