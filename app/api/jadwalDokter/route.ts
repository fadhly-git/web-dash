import { NextApiRequest, NextApiResponse } from "next";

// Contoh data jadwal dokter yang diterima dari backend atau database
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

interface GroupedSchedule {
  days: string;
  time: string;
}

// Fungsi untuk memformat rentang hari
const formatDayRange = (start: number, end: number): string => {
  if (start === end) {
    return PRACTICE_DAYS.find((day) => day.id === start)?.name || "";
  } else if (end === start + 1) {
    return `${PRACTICE_DAYS.find((day) => day.id === start)?.name} & ${
      PRACTICE_DAYS.find((day) => day.id === end)?.name
    }`;
  } else {
    return `${PRACTICE_DAYS.find((day) => day.id === start)?.name} - ${
      PRACTICE_DAYS.find((day) => day.id === end)?.name
    }`;
  }
};

// Fungsi untuk mengelompokkan jadwal dokter berdasarkan jam praktek
const groupSchedules = (schedules: StatusDoc[]): GroupedSchedule[] => {
  const grouped: { [key: string]: number[] } = {};
  schedules.forEach((schedule) => {
    if (!grouped[schedule.jam_praktek]) {
      grouped[schedule.jam_praktek] = [];
    }
    grouped[schedule.jam_praktek].push(schedule.hari);
  });

  const result: GroupedSchedule[] = [];
  Object.entries(grouped).forEach(([time, days]) => {
    const sortedDays = days.sort((a, b) => a - b);
    const dayGroups: string[] = [];
    let rangeStart = sortedDays[0];
    let rangeEnd = sortedDays[0];

    for (let i = 1; i < sortedDays.length; i++) {
      if (sortedDays[i] === rangeEnd + 1) {
        rangeEnd = sortedDays[i];
      } else {
        dayGroups.push(formatDayRange(rangeStart, rangeEnd));
        rangeStart = sortedDays[i];
        rangeEnd = sortedDays[i];
      }
    }
    dayGroups.push(formatDayRange(rangeStart, rangeEnd));

    result.push({ days: dayGroups.join(" | "), time });
  });

  return result;
};

// API handler untuk mengambil data jadwal dokter
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Ambil data dari request body atau bisa di-fetch dari database
    const schedules: StatusDoc[] = req.body; // Misalnya, data ini diterima dari frontend atau database

    const groupedSchedules = groupSchedules(schedules);
    return res.status(200).json(groupedSchedules);
  } catch (error) {
    console.error("Error fetching doctor schedules:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
