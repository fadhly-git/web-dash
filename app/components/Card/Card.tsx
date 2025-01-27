"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
  Jenis_Spesialis: string;
}

interface DokterJaga {
  hari: number;
  jam_praktek: string;
  status: string;
  Nama_Dokter: string;
}

const Card: React.FC = () => {
  const [doctors, setDoctors] = useState<StatusDoc[]>([]);
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const [dokterJaga, setDokterJaga] = useState<DokterJaga[]>([]);

  const fetchDokterJaga = async () => {
    try {
      const response = await axios.get("/api/dokterJaga");
      setDokterJaga(response.data);
    } catch (error) {
      console.error("Error fetching dokter jaga:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("/api/status/status");
      setDoctors(response.data);
      setCurrentDoctorIndex(0);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchDokterJaga();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDoctorIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= doctors.length) {
          fetchDoctors();
          return 0;
        }
        return nextIndex;
      });
    }, 30000); // Ganti dokter setiap 5 detik

    return () => clearInterval(interval);
  }, [doctors]);

  const currentDoctor = doctors[currentDoctorIndex];

  const getDayName = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(date);
  };
  const day =
    PRACTICE_DAYS.find((day) => day.id == currentDoctor?.hari)?.name || "";
  let statusClass = "";
  if (currentDoctor) {
    statusClass =
      currentDoctor.status == "Aktif"
        ? "bg-gradient-to-tl from-green-600 to-lime-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold leading-none text-white"
        : "bg-gradient-to-tl from-slate-600 to-slate-300 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold leading-none text-white";
  }

  const today = new Date();
  const dayName = getDayName(today);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col w-full max-w-7xl p-6 bg-gray-100 rounded-[1vw] shadow-xl">
        {currentDoctor ? (
          <div className="flex flex-col lg:flex-row w-full max-w-7xl">
            <div className="lg:w-1/4">
              <div className="flex justify-between mb-0">
                <h4 className="font-bold">Dokter Jaga</h4>
              </div>
              <span className="flex mt-0">
                Hari {dayName}, {today.toLocaleDateString("id-ID")}
              </span>
              {dokterJaga.length > 0 ? (
                dokterJaga.map((dokter, index) => (
                  <div
                    key={index}
                    className="grid-cols-none text-xs items-center justify-between border-b border-gray-300 mt-0"
                  >
                    <p className="font-bold mb-0 mt-1">{dokter.Nama_Dokter}</p>
                    <p className="mb-1 font-bold text-gray-600">
                      {dokter.jam_praktek}
                    </p>
                  </div>
                ))
              ) : (
                <div className="mt-2">
                  <p className="text-gray-600">Tidak ada dokter jaga</p>
                </div>
              )}
            </div>
            <div className="w-px bg-blue-500 mx-4"></div>
            <div className="lg:w-2/4 content">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">Jadwal Dokter</h3>
              </div>
              <div className="content-center">
                <h4 className="text-2xl font-bold">
                  {currentDoctor.Nama_Dokter}
                </h4>
                <h6 className="text-lg">
                  Spesialis {currentDoctor.Jenis_Spesialis}
                </h6>
                <span className="text-lg">Hari Praktek</span>
                <h6 className="text-lg">{day}</h6>
                <span className="text-lg">Jam Praktek</span>
                <h6>{currentDoctor.jam_praktek}</h6>
                <h6 className={statusClass}>{currentDoctor.status}</h6>
              </div>
            </div>
            <div className="lg:w-1/4 mt-12 lg:mt-0 flex items-center justify-center">
              <div className="relative w-full h-96 bg-gradient-to-tl from-blue-700 to-blue-200 rounded-xl">
                <img
                  src="./img/shapes/waves-white.svg"
                  className="absolute top-0 hidden w-1/2 h-full lg:block"
                  alt="waves"
                />
                <div className="relative flex items-center justify-center h-full">
                  <img
                    className="relative z-10 w-full rounded-lg h-full object-cover"
                    src={
                      currentDoctor.Foto_Dokter ||
                      "./img/illustrations/rocket-white.png"
                    }
                    alt={currentDoctor.Nama_Dokter}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Card;
