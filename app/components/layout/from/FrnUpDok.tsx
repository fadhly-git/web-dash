import React, { useState } from "react";
import axios from "axios";
import InfoModal from "../InfoModal/Modal";

interface Dokter {
  id_dokter: number;
  Nama_Dokter: string;
  Foto_Dokter?: string;
  Jenis_Spesialis: string;
}

interface FormUpDokProps {
  dokter: Dokter;
  setRefresh: () => void;
}

const FormInput: React.FC<FormUpDokProps> = ({ dokter, setRefresh }) => {
  const ID_Dokter = dokter.id_dokter.toString() || "2";
  const [doctorName, setDoctorName] = useState(dokter.Nama_Dokter);
  const [specialization, setSpecialization] = useState(dokter.Jenis_Spesialis);
  const [doctorPhoto, setDoctorPhoto] = useState<File | string | null>(
    dokter.Foto_Dokter || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [massage, setMassage] = useState("");

  const handleClose = () => {
    setInfoModalOpen(false);
    if (type === "success") {
      setRefresh();
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (2MB limit)
      if (file.size > 4 * 1024 * 1024) {
        setType("error");
        setMassage("Ukuran file terlalu besar, maksimal 4MB");
        setInfoModalOpen(true);
        return;
      }

      // Validate file type
      if (!file.type.includes("image/")) {
        setType("error");
        setMassage("Hanya file image yang diperbolehkan");
        setInfoModalOpen(true);
        return;
      }

      setDoctorPhoto(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    {
      const formData = new FormData();
      formData.append("id_dokter", ID_Dokter);
      formData.append("Nama_Dokter", doctorName);
      formData.append("Jenis_Spesialis", specialization);
      if (doctorPhoto instanceof File) {
        formData.append("file", doctorPhoto);
      }

      try {
        const response = await axios.put("/api/UpdateDok", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          setType("success");
          setMassage("Data berhasil disimpan");
          setInfoModalOpen(true);
        }

        // Reset all form values
        setDoctorName("");
        setSpecialization("");
        setDoctorPhoto(null);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setType("error");
          setMassage("Error " + error);
          setInfoModalOpen(true);
        } else {
          setType("error");
          setMassage("Kesalahan dalam upload data");
          setInfoModalOpen(true);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 md:p-5">
      {/* Alert Component */}
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={handleClose}
        message={massage}
        type={type}
      />
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
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Nama Dokter"
            required
          />
        </div>

        {/* Jenis Spesialis */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Jenis Spesialis
          </label>
          <input
            type="text"
            name="specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Jenis Spesialis"
            required
          />
        </div>
      </div>

      {/* Full width file input */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Foto Dokter
        </label>
        <input
          type="file"
          name="doctorPhoto"
          onChange={handlePhotoChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`... ${
            isSubmitting
              ? "bg-gradient-to-tl from-gray-100 to-gray-100 cursor-not-allowed"
              : "bg-gradient-to-tl from-blue-500 to-blue-600 hover:bg-gradient-to-tl text-white hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500"
          } text-cyan bg-blue hover:text-white hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

export default FormInput;
