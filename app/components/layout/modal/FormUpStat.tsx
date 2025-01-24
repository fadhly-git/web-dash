import React, { use, useEffect, useState } from "react";
import axios from "axios";

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
  isOpen: boolean;
  onClose: () => void;
  status: StatusDoc;
  setRefresh: () => void;
  isRefresh: boolean;
}

const FormInput: React.FC<FormUpStatProps> = ({
  isOpen,
  onClose,
  status,
  setRefresh,
  isRefresh,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState(status.Nama_Dokter);
  const idHari = status.hari;
  const Day = PRACTICE_DAYS.find((day) => day.id == idHari)?.name || "";
  const [practiceHours, setPracticeHours] = useState(status.jam_praktek);
  const [isActive, setIsActive] = useState(status.status == "Aktif");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status.jam_praktek) {
      const [start, end] = status.jam_praktek.split(" - ");
      setStartTime(start);
      setEndTime(end);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    {
      const formData = new FormData();
      formData.append("id_dokter", status.id_dokter.toString());
      formData.append("hari", idHari.toString());
      formData.append("jam_praktek", practiceHours);
      formData.append("status", isActive.toString());

      // Convert FormData to a regular object and log it
      const formDataObj = Object.fromEntries(formData.entries());
      console.log("FormData contents:", formDataObj);

      // try {
      //   const response = await axios.put("/api/UpdateDok", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   });

      //   if (response.status === 200) {
      //     console.log("Response:", response.data);
      //     setAlert({
      //       show: true,
      //       type: "success",
      //       message: response.data.message,
      //     });
      //   }
      // } catch (error) {
      //   console.error("Error uploading file:", error);
      //   if (axios.isAxiosError(error)) {
      //     setAlert({
      //       show: true,
      //       type: "error",
      //       message: error.response?.data?.message || "Error uploading data",
      //     });
      //   } else {
      //     setAlert({
      //       show: true,
      //       type: "error",
      //       message: "Error uploading data",
      //     });
      //   }
      //   setTimeout(() => {
      //     setAlert({ show: false, type: "", message: "" });
      //   }, 3000);
      // } finally {
      //   window.location.reload();
      //   setIsSubmitting(false);
      // }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 md:p-5">
      {/* Alert Component */}
      {alert.show && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            alert.type === "success"
              ? "bg-green-100 border-l-4 border-green-500 text-green-700"
              : "bg-red-100 border-l-4 border-red-500 text-red-700"
          }`}
        >
          <div className="flex items-center">
            {alert.type === "success" ? (
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <p className="text-sm font-medium">{alert.message}</p>
          </div>
        </div>
      )}
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
            Status Aktif
          </span>
        </label>
        <p>
          status aktif:
          {isActive ? "Aktif" : "Tidak Aktif"}
        </p>
        {/* <div className="flex">
          <p className="items-center">{JSON.stringify(doctorArray)}</p>
        </div> */}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`... ${
            isSubmitting
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-cyan bg-blue hover:text-white hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        >
          Simpan
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`... ${
            isSubmitting
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-cyan bg-blue hover:text-white hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

export default FormInput;
