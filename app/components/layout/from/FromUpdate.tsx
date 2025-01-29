// import React, { useState } from "react";

// interface Doctor {
//   id: number;
//   id_dokter: number;
//   Nama_Dokter: string;
//   Foto_Dokter?: string;
//   hari: number;
//   jam_praktek: string;
//   status: string;
// }

// interface FormUpdateProps {
//   doctor: Doctor;
// }

// const FormUpdate: React.FC<FormUpdateProps> = ({ doctor }) => {
//   const [isActive, setIsActive] = useState(false);
//   const [formData, setFormData] = useState<Doctor>(doctor);
//   const [newImage, setNewImage] = useState<File | null>(null);
//   const [doctorName, setDoctorName] = useState(doctor.Nama_Dokter);
//   const [doctorPhoto, setDoctorPhoto] = useState<File | string | null>(
//     doctor.Foto_Dokter || null
//   );
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [alert, setAlert] = useState({ show: false, message: "", type: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Validate file size (2MB limit)
//       if (file.size > 2 * 1024 * 1024) {
//         setAlert({
//           show: true,
//           message: "File size should be less than 2MB",
//           type: "error",
//         });
//         e.target.value = "";
//         setTimeout(
//           () => setAlert({ show: false, message: "", type: "" }),
//           3000
//         );
//         return;
//       }

//       // Validate file type
//       if (!file.type.startsWith("image/")) {
//         setAlert({
//           show: true,
//           message: "Please upload an image file",
//           type: "error",
//         });
//         e.target.value = "";
//         setTimeout(
//           () => setAlert({ show: false, message: "", type: "" }),
//           3000
//         );
//         return;
//       }

//       setDoctorPhoto(file);
//       setAlert({
//         show: true,
//         message: "File uploaded successfully",
//         type: "success",
//       });
//       setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setNewImage(e.target.files[0]);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newImage) {
//       formData.Foto_Dokter = newImage.name; // Update with new image name
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 md:p-5">
//       {/* Alert Component */}
//       {alert.show && (
//         <div
//           className={`mb-4 p-4 rounded-lg ${
//             alert.type === "success"
//               ? "bg-green-100 border-l-4 border-green-500 text-green-700"
//               : "bg-red-100 border-l-4 border-red-500 text-red-700"
//           }`}
//         >
//           <div className="flex items-center">
//             {alert.type === "success" ? (
//               <svg
//                 className="w-5 h-5 mr-2"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 className="w-5 h-5 mr-2"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             )}
//             <p className="text-sm font-medium">{alert.message}</p>
//           </div>
//         </div>
//       )}
//       {/* Grid 2 columns */}
//       <div className="grid grid-cols-2 gap-6 mb-4">
//         {/* Nama Dokter */}
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//             Nama Dokter
//           </label>
//           <input
//             type="text"
//             name="doctorName"
//             value={doctorName}
//             onChange={(e) => setDoctorName(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//             placeholder="Nama Dokter"
//             required
//           />
//         </div>
//       </div>

//       {/* Full width file input */}
//       <div className="mb-4">
//         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//           Foto Dokter
//         </label>
//         <input
//           type="file"
//           name="doctorPhoto"
//           onChange={handlePhotoChange}
//           className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//           required
//         />
//       </div>

//       {/* Toggle Status */}
//       <div className="mb-4">
//         <label className="inline-flex items-center cursor-pointer">
//           <input
//             type="checkbox"
//             checked={isActive}
//             onChange={(e) => setIsActive(e.target.checked)}
//             className="sr-only peer"
//           />
//           <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
//           <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
//             Status Aktif
//           </span>
//         </label>
//         <p>
//           ini status aktif:
//           {isActive ? "Aktif" : "Tidak Aktif"}
//         </p>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex items-center justify-end space-x-2">
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className={`... ${
//             isSubmitting
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-600"
//           } text-cyan bg-blue hover:text-white hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
//         >
//           Simpan
//         </button>
//       </div>
//     </form>
//   );
// };

// export default FormUpdate;
