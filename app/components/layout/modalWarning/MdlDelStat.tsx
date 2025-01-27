"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";

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

interface ModalProps {
  status: StatusDoc;
  isOpen: boolean;
  onClose: () => void;
  setRefresh: () => void;
}

const ModalDelWarn: React.FC<ModalProps> = ({
  status,
  isOpen,
  onClose,
  setRefresh,
}) => {
  const id = status.id;
  const namaDokter = status.Nama_Dokter;
  const idHari = status.hari;
  const Day = PRACTICE_DAYS.find((day) => day.id == idHari)?.name || "";
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusV, setStatus] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  // const curentUrl = window.location.href;
  // console.log(curentUrl);
  const handleClose = () => {
    setStatus(null);
    setError(null);
    setAlert({ show: false, type: "error", message: "" });
    setRefresh();
    onClose();
  };

  const [alert, setAlert] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({
    show: false,
    type: "error",
    message: "",
  });
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      const res = await fetch(`/api/status/${status.id}/Delete`, {
        method: "DELETE",
        body: JSON.stringify(status),
      });
      if (!res.ok) {
        throw new Error("Failed to deleting status");
      } else {
        setStatus(true);
        onClose();
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to deleting status"
      );
      setAlert({
        show: true,
        type: "error",
        message: "Failed to deleting status" + err,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {statusV === true ? (
        <Dialog open={true} onClose={onClose} className="relative z-10">
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
                      <CheckCircleIcon className="h-6 w-6 text-green-600" />
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
                          Doctor status data has been successfully deleted
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
      ) : error && alert.show ? (
        <div
          className={`mb-4 p-4 rounded-lg bg-red-100 border-l-4 border-red-500 text-red-700`}
        >
          <div className="flex items-center">
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
            <p className="text-sm font-medium">{error}</p>
          </div>
        </div>
      ) : (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
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
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <ExclamationTriangleIcon className="size-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold text-gray-900"
                      >
                        Hapus data status
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Apakah kamu yakin ingin menghapus jam praktek hari{" "}
                          <span className="text-orange-400 font-bold">
                            {Day}{" "}
                          </span>
                          dokter{" "}
                          <span className="text-orange-400 font-bold">
                            {namaDokter}
                          </span>
                          ? Data will be permanently removed. This action cannot
                          be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => handleDelete()}
                    disabled={isDeleting}
                    className="inline-flex w-full justify-center rounded-md bg-gradient-to-tl from-red-900 to-orange-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => onClose()}
                    disabled={isDeleting}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default ModalDelWarn;
