"use client";

import { useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import InfoModal from "@components/layout/InfoModal/Modal";

interface Dokter {
  id_dokter: number;
  Nama_Dokter: string;
  Foto_Dokter?: string;
  Jenis_Spesialis: string;
}

interface ModalProps {
  dokter: Dokter;
  isOpen: boolean;
  onClose: () => void;
  setRefresh: () => void;
}

const ModalDelWarn: React.FC<ModalProps> = ({
  dokter,
  isOpen,
  onClose,
  setRefresh,
}) => {
  const namaDokter = dokter.Nama_Dokter;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [massage, setMassage] = useState("");

  const handleClose = () => {
    setInfoModalOpen(false);
    onClose();
    if (type == "success") {
      setRefresh();
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/dokter/${dokter.id_dokter}/Delete`, {
        method: "DELETE",
        body: JSON.stringify(dokter),
      });
      if (!res.ok) {
        setType("error");
        setMassage("Gagal menghapus data dokter");
        setInfoModalOpen(true);
      } else {
        setType("success");
        setMassage("Data dokter berhasil dihapus");
        setInfoModalOpen(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      setType("error");
      setMassage("Gagal menghapus data dokter");
      setInfoModalOpen(true);
    } finally {
      setIsDeleting(false);
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
                      Delete Data Doctor
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete doctor{" "}
                        <span className="text-orange-400 font-bold">
                          {namaDokter}
                        </span>
                        ? All of your data will be permanently removed. This
                        action cannot be undone.
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
    </>
  );
};

export default ModalDelWarn;
