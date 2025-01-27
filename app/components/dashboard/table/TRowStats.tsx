import React, { useState } from "react";
import Image from "next/image";
import Modal from "@components/layout/modal/MdlUpdStats";
import ModalDel from "@components/layout/modalWarning/MdlDelStat";

const PRACTICE_DAYS = [
  { id: 1, name: "Senin" },
  { id: 2, name: "Selasa" },
  { id: 3, name: "Rabu" },
  { id: 4, name: "Kamis" },
  { id: 5, name: "Jumat" },
  { id: 6, name: "Sabtu" },
  { id: 7, name: "Minggu" },
];

interface StatusDoc {
  id: number;
  id_dokter: number;
  Nama_Dokter: string;
  Foto_Dokter?: string;
  hari: number;
  jam_praktek: string;
  status: string;
}

interface TRowProps {
  status: StatusDoc;
  isRefresh: boolean;
  setRefresh: () => void;
}

const TRow: React.FC<TRowProps> = ({ status, isRefresh, setRefresh }) => {
  const [isOpenUp, setIsModalOpen] = useState(false);
  const [isMdlDelOpen, setIsMdlDelOpen] = useState(false);
  const dayName =
    PRACTICE_DAYS.find((day) => day.id == status.hari)?.name || "";
  const statusClass =
    status.status == "Aktif"
      ? "bg-gradient-to-tl from-green-600 to-lime-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold leading-none text-white"
      : "bg-gradient-to-tl from-slate-600 to-slate-300 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold leading-none text-white";
  return (
    <>
      <tr key={status.id}>
        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
          <div className="flex px-2 py-1">
            <div>
              <Image
                src={status.Foto_Dokter || "/img/favicon.png"}
                className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                alt={`Foto ${status.Nama_Dokter}`}
                title={`Foto ${status.Nama_Dokter}`}
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h6 className="mb-0 text-sm leading-normal">
                {status.Nama_Dokter}
              </h6>
            </div>
          </div>
        </td>
        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
          <p className="mb-0 text-sm text-center leading-normal text-black">
            {dayName}
          </p>
        </td>
        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
          <p className="mb-0 text-sm text-center leading-normal text-black">
            {status.jam_praktek}
          </p>
        </td>
        <td
          className={`p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent justify-center items-center text-center`}
        >
          <p className={statusClass}>{status.status}</p>
        </td>
        <td className="text-center">
          <div className="grid grid-cols-2 gap-0">
            <div className="">
              <button
                className="inline-block px-4 py-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-green-900 to-green-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25"
                onClick={() => setIsModalOpen(true)}
              >
                {" "}
                <i className="fas fa-plus"> </i>&nbsp;&nbsp;Edit
              </button>
              <Modal
                isOpen={isOpenUp}
                onClose={() => setIsModalOpen(false)}
                status={status}
                setRefresh={setRefresh}
              />
            </div>
            <div className="">
              <button
                className="inline-block px-4 py-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-yellow-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25"
                onClick={() => {
                  setIsMdlDelOpen(true);
                }}
              >
                Delete
              </button>
              <ModalDel
                status={status}
                isOpen={isMdlDelOpen}
                onClose={() => setIsMdlDelOpen(false)}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TRow;
