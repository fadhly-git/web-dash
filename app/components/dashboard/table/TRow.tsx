import React, { useState } from "react";
import Image from "next/image";
interface Dokter {
  ID: number;
  Nama_Dokter: string;
  Hari_Praktek: string;
  Jam_Praktek: string;
  Foto_Dokter?: string;
  Status: "AKTIF" | "CUTI";
  Jenis_Spesialis: string;
}

const TRow: React.FC<{ dokter: Dokter }> = ({ dokter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <tr>
        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
          <div className="flex px-2 py-1">
            <div>
              <Image
                src={dokter.Foto_Dokter || "/img/favicon.png"}
                className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                alt="user1"
                width={36}
                height={36}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h6 className="mb-0 text-sm leading-normal">
                {dokter.Nama_Dokter}
              </h6>
            </div>
          </div>
        </td>
        <td>{dokter.Hari_Praktek}</td>
        <td>{dokter.Jam_Praktek}</td>
        <td>
          {dokter.Foto_Dokter ? (
            <img
              src={dokter.Foto_Dokter}
              alt={dokter.Nama_Dokter}
              width="50"
              height="50"
            />
          ) : (
            "No Photo"
          )}
        </td>
        <td>{dokter.Status}</td>
        <td>{dokter.Jenis_Spesialis}</td>
        <td>
          <button onClick={handleEditClick}>Edit</button>
        </td>
      </tr>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Edit Dokter</h2>
            {/* Form for editing dokter details */}
          </div>
        </div>
      )}
    </>
  );
};

export default TRow;
