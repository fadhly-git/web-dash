import React, { useEffect, useState } from "react";
import axios from "axios";
import InfoModal from "../InfoModal/Modal";

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

interface ModalProps {
  setRefresh: () => void;
}

const FormInput: React.FC<ModalProps> = ({ setRefresh }) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [practiceHours, setPracticeHours] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [massage, setMassage] = useState("");
  const [doctors, setDoctors] = useState<doctor[]>([]);

  const handleClose = () => {
    if (type == "success") {
      setRefresh();
      setInfoModalOpen(false);
    } else {
      setInfoModalOpen(false);
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get<doctor[]>("/api/status/doctors");
        setDoctors(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPracticeHours(startTime + " - " + endTime);
    if (!endTime && !startTime) {
      setType("error");
      setMassage("Practice hours cannot be empty");
      setInfoModalOpen(true);
      setIsSubmitting(false);
      return;
    } else {
      if (selectedDoctor) {
        const formData = new FormData();
        formData.append("doctorId", selectedDoctor);
        formData.append("practiceDays", selectedDay);
        formData.append("practiceHours", practiceHours);
        formData.append("isActive", isActive.toString());

        let response;

        try {
          response = await axios.post("/api/uploadStats", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200) {
            setType("success");
            setMassage("Data inserted successfully");
            setInfoModalOpen(true);
          } else if (response.status === 400) {
            setType("error");
            setMassage("Dokter sudah memiliki jadwal di hari tersebut");
            setInfoModalOpen(true);
          }

          // Reset all form values
          setSelectedDay("");
          setPracticeHours("");
        } catch (error) {
          if (axios.isAxiosError(error) || response?.status === 400) {
            setType("error");
            setMassage("Error, dokter sudah memiliki jadwal di hari tersebut");
            setInfoModalOpen(true);
          } else {
            setType("error");
            setMassage("Error " + error);
            setInfoModalOpen(true);
          }
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  return (
    <>
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={handleClose}
        message={massage}
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
              Status {isActive ? "Aktif" : "Cuti"}
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
                : "bg-gradient-to-tl from-blue-500 to-blue-500 text-white hover:bg-gradient-to-tl hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500"
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
