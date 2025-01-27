"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@components/layout/modal/modalInput";
import TRow from "./TRowDok";

interface Doctor {
  id_dokter: number;
  Nama_Dokter: string;
  Foto_Dokter: string;
  Jenis_Spesialis: string;
}

const DashboardTable: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Doctor[]>("/api/doctors");
        setDoctors(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch doctors");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
        setRefresh(false);
      }
    };

    fetchDoctors();
  }, [refresh]);

  return (
    <div className="w-full px-6 py-6 mx-auto">
      <div className="flex flex-wrap -mx-3">
        <div className="flex-none w-full max-w-full px-3">
          <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
              <div className="flex flex-wrap -mx-3">
                <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                  <h6 className="mb-0">Tabel Dokter</h6>
                </div>
                <div className="flex-none w-1/2 max-w-full px-3 text-right">
                  <button
                    className="inline-block px-4 py-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-blue-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25"
                    onClick={() => setIsModalOpen(true)}
                  >
                    {" "}
                    <i className="fas fa-plus"> </i>&nbsp;&nbsp;Add New Doctors
                  </button>
                  <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    setRefresh={() => setRefresh(true)}
                  />
                </div>
              </div>
            </div>
            <div className="flex-auto px-0 pt-0 pb-2">
              <div className="p-0">
                <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-100">
                  <thead className="align-bottom">
                    <tr>
                      <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-700 opacity-70">
                        Nama Dokter
                      </th>
                      <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-700 opacity-70">
                        Jenis Spesialis
                      </th>
                      <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-700 opacity-70">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {error ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4 text-lg">
                          {error}
                        </td>
                      </tr>
                    ) : isLoading ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4 text-lg">
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      doctors.map((doctor) => (
                        <TRow
                          key={doctor.id_dokter}
                          dokter={doctor}
                          setRefresh={() => setRefresh(true)}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
