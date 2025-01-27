import React, { useState } from "react";
import Image from "next/image";
import Modal from "@components/layout/modal/MdlUpDok";
import ModalDelWarn from "@components/layout/modalWarning/MdlDelWarn";

interface Dokter {
  id_dokter: number;
  Nama_Dokter: string;
  Foto_Dokter?: string;
  Jenis_Spesialis: string;
}
interface TRowProps {
  dokter: Dokter;
  setRefresh: () => void;
}

const TRow: React.FC<TRowProps> = ({ dokter, setRefresh }) => {
  const [isOpenUp, setIsOpenUp] = useState(false);
  const [isMdlDelOpen, setIsMdlDelOpen] = useState(false);
  const handleClose = () => {
    setIsOpenUp(false);
  };
  return (
    <>
      <tr key={dokter.id_dokter}>
        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
          <div className="flex px-2 py-1">
            <div>
              <Image
                src={dokter.Foto_Dokter || "/img/favicon.png"}
                className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                alt={`Foto ${dokter.Nama_Dokter}`}
                title={`Foto ${dokter.Nama_Dokter}`}
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h6 className="mb-0 text-sm leading-normal">
                {dokter.Nama_Dokter}
              </h6>
            </div>
          </div>
        </td>
        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
          <p className="mb-0 text-sm text-center leading-normal text-black">
            {dokter.Jenis_Spesialis}
          </p>
        </td>
        <td className="p-2 text-center">
          <div className="flex justify-center gap-2">
            <button
              className="inline-block px-4 py-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-green-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25"
              onClick={() => setIsOpenUp(true)}
            >
              {" "}
              <i className="fas fa-plus"> </i>&nbsp;&nbsp;Edit
            </button>
            <Modal
              dokter={dokter}
              isOpen={isOpenUp}
              onClose={() => handleClose()}
              setRefresh={() => setRefresh()}
            />
            <button
              className="inline-block px-4 py-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-yellow-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25"
              onClick={() => {
                setIsMdlDelOpen(true);
              }}
            >
              Delete
            </button>
            <ModalDelWarn
              dokter={dokter}
              isOpen={isMdlDelOpen}
              onClose={() => setIsMdlDelOpen(false)}
              setRefresh={() => setRefresh()}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default TRow;
