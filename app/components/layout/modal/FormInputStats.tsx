import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface doctor {
  id_dokter: number;
  Nama_Dokter: string;
  Foto_Dokter?: string;
}

const PRACTICE_DAYS = [
  { id: 1, name: "Senin" },
  { id: 2, name: "Selasa" },
  { id: 3, name: "Rabu" },
  { id: 4, name: "Kamis" },
  { id: 5, name: "Jumat" },
  { id: 6, name: "Sabtu" },
  { id: 7, name: "Minggu" },
];

const FormInput: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [practiceHours, setPracticeHours] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [doctors, setDoctors] = useState<doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setError(null);
    setAlert({ show: false, type: "error", message: "" });
    window.location.reload();
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<doctor[]>("/api/status/doctors");
        setDoctors(response.data);
        console.log("Data:", response);
        setError(null);
      } catch (err) {
        setError("Failed to fetch doctors");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPracticeHours(startTime + " - " + endTime);
    if (endTime) {
      setPracticeHours(startTime + " - " + endTime);
    }
    if (!practiceHours) {
      setAlert({
        show: true,
        type: "error",
        message: "Practice hours cannot be empty",
      });
      setTimeout(() => setAlert({ show: false, message: "", type: "" }), 10000);
      setIsSubmitting(false);
      return;
    } else {
      if (selectedDoctor) {
        const formData = new FormData();
        formData.append("doctorId", selectedDoctor);
        formData.append("practiceDays", selectedDay);
        formData.append("practiceHours", practiceHours);
        formData.append("isActive", isActive.toString());

        // // Convert FormData to a regular object and log it
        // const formDataObj = Object.fromEntries(formData.entries());
        // console.log("FormData contents:", formDataObj);
        try {
          const response = await axios.post("/api/uploadStats", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200) {
            console.log("Response:", response.data);
            setIsModalOpen(true);
          }

          // Reset all form values
          setSelectedDay("");
          setPracticeHours("");
          setIsActive(false);
          setStartTime("");
          setEndTime("");
        } catch (error) {
          console.error("Error uploading file:", error);
          if (axios.isAxiosError(error)) {
            setAlert({
              show: true,
              type: "error",
              message: error.response?.data?.message || "Error uploading data",
            });
          } else {
            setAlert({
              show: true,
              type: "error",
              message: "Error uploading data",
            });
          }
          setTimeout(() => {
            setAlert({ show: false, type: "", message: "" });
          }, 3000);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  return (
    <>
      <Dialog
        open={isModalOpen}
        onClose={setIsModalOpen}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-center min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white items-center px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="items-center">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10">
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 items-center sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base items center font-semibold text-gray-900"
                    >
                      Success
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Status dokter berhasil diupload
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-gradient-to-tl from-green-700 to-orange-10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
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
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="mt-1 block w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Pilih Dokter</option>
              {Array.isArray(doctors) && doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <option key={doctor.id_dokter} value={doctor.id_dokter}>
                    {doctor.Nama_Dokter}
                  </option>
                ))
              ) : (
                <option value="">No doctors available</option>
              )}
            </select>
          </div>

          {/* Hari */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Hari Praktek
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="mt-1 block w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Pilih Hari</option>
              {PRACTICE_DAYS.map((day) => (
                <option key={day.id} value={day.id}>
                  {day.name}
                </option>
              ))}
            </select>
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
      </form>
    </>
  );
};

export default FormInput;
