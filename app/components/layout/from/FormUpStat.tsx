import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import InfoModal from "../InfoModal/Modal";

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

interface FormUpStatProps {
  onClose: () => void;
  status: StatusDoc;
  setRefresh: () => void;
}

const FormInput: React.FC<FormUpStatProps> = ({
  onClose,
  status,
  setRefresh,
}) => {
  const selectedDoctor = status.Nama_Dokter;
  const id = status.id;
  const idHari = status.hari;
  const Day = PRACTICE_DAYS.find((day) => day.id == idHari)?.name || "";
  const [practiceHours, setPracticeHours] = useState(status.jam_praktek);
  const [isActive, setIsActive] = useState(status.status == "Aktif");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [type, setModalType] = useState<"success" | "error">("success");
  const [message, setModalMessage] = useState("");

  const handleClose = () => {
    if (type === "success") {
      onClose();
      setRefresh();
      setIsInfoModalOpen(false);
    } else {
      setIsInfoModalOpen(false);
    }
  };

  useEffect(() => {
    if (status.jam_praktek) {
      const [start, end] = status.jam_praktek.split(" - ");
      setStartTime(start);
      setEndTime(end);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    {
      const formData = new FormData();
      formData.append("id", id.toString());
      formData.append("id_dokter", status.id_dokter.toString());
      formData.append("hari", idHari.toString());
      formData.append("jam_praktek", practiceHours);
      formData.append("status", isActive.toString());

      try {
        const response = await axios.put("/api/updateStats", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          setModalType("success");
          setModalMessage(response.data.message);
          setIsInfoModalOpen(true);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setModalType("error");
          setModalMessage(
            error.response?.data.message || "Error uploading data"
          );
          setIsInfoModalOpen(true);
        } else {
          setModalType("error");
          setModalMessage("Error uploading data");
          setIsInfoModalOpen(true);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      {/* Info Modal */}
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={handleClose}
        message={message}
        type={type}
      />
      <form onSubmit={handleSubmit} className="p-4 md:p-5">
        {/* Grid 2 columns */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          {/* Nama Dokter */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nama Dokter
            </label>
            <input
              type="text"
              name="doctorName"
              value={selectedDoctor}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Nama Dokter"
              disabled
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Hari Praktek
            </label>
            <input
              type="text"
              name="doctorName"
              value={Day}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              disabled
            />
          </div>
        </div>

        {/* Jam Praktek */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Jam Mulai
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 block w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Jam Selesai
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                setPracticeHours(startTime + " - " + endTime);
              }}
              className="mt-1 block w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Toggle Status */}
        <div className="mb-4">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => {
                setIsActive(e.target.checked);
                setPracticeHours(startTime + " - " + endTime);
              }}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Status {isActive ? "Aktif" : "Tidak Aktif"}
            </span>
          </label>
          {/* <div className="flex">
          <p className="items-center">{JSON.stringify(doctorArray)}</p>
        </div> */}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => setPracticeHours(startTime + " - " + endTime)}
            type="submit"
            disabled={isSubmitting}
            className={`... ${
              isSubmitting
                ? "bg-gradient-to-tl from-gray-100 to-gray-100 cursor-not-allowed"
                : "bg-gradient-to-tl from-green-500 to-green-600 text-white hover:bg-gradient-to-tl hover:from-green-600 hover:to-green-700 focus:ring-blue-500"
            } text-cyan bg-blue bg-gradient-to-tl from-green-200 to-green-300 hover:text-white hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            Simpan
          </button>
        </div>
      </form>
    </>
  );
};

export default FormInput;
