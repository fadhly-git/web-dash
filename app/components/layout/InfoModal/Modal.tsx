import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  type: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message, type }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-center min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white items-center px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="items-center">
                  <div className="mt-3 text-center sm:ml-4 items-center sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className={`text-lg font-bold ${
                        type === "success" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {type === "success" ? "Success" : "Error"}
                    </DialogTitle>
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10">
                      {type === "success" ? (
                        <CheckCircleIcon className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircleIcon className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${
                    type === "success"
                      ? "bg-gradient-to-tl from-green-500 to-green-600 hover:bg-green-700"
                      : "bg-gradient-to-tl from-red-600 to-red-700 hover:bg-red-700"
                  }`}
                  onClick={() => {
                    onClose();
                  }}
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </DialogBackdrop>
    </Dialog>
  );
};

export default Modal;
