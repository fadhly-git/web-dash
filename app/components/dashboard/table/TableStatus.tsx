"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TRow from "./TRowStats";
import Modal from "@components/layout/modal/MdlInpStat";

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

const TableStatus: React.FC = () => {
  const [status, setStatus] = useState<StatusDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<StatusDoc[]>("/api/status/status");
        setStatus(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch doctors");
        console.error("Error fetching data:", err);
      } finally {
        setRefresh(false);
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [isRefresh]);

  const filteredDoctorsStat = status.filter(
    (status) =>
      status.Nama_Dokter.toLowerCase().includes(search.toLowerCase()) ||
      status.status.toLowerCase().includes(search.toLowerCase()) ||
      status.jam_praktek.toLowerCase().includes(search.toLowerCase()) ||
      PRACTICE_DAYS.find((day) => day.id == status.hari)
        ?.name.toLocaleLowerCase()
        .includes(search.toLowerCase())
  );

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
                  <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 mr-4 align-middle transition-all cursor-pointer leading-pro text-xs ease-soft-in inline-block border rounded-lg hover:shadow-soft-xs active:opacity-75 hover:scale-105 tracking-tight-soft bg-150 text-gray"
                  />
                  <button
                    className="inline-block px-4 py-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-blue-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <i className="fas fa-plus"></i>&nbsp;&nbsp;Add New Doctors
                    Status
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
              <div className="p-0 overflow-x-auto">
                <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                  <thead className="align-bottom">
                    <tr>
                      <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-700 opacity-70">
                        Nama Dokter
                      </th>
                      <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-700 opacity-70">
                        Hari Praktek
                      </th>
                      <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-700 opacity-70">
                        Jam Praktek
                      </th>
                      <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-700 opacity-70">
                        Status
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
                    ) : Array.isArray(status) && status.length > 0 ? (
                      filteredDoctorsStat.map((status) => {
                        return (
                          <TRow
                            key={status.id}
                            status={status}
                            setRefresh={() => setRefresh(true)}
                          />
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-4 text-lg">
                          No data found
                        </td>
                      </tr>
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

export default TableStatus;
