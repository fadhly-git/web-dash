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
import axios from "axios";
import Modal from "../InfoModal/Modal";

interface User {
  id: number;
  username: string;
  created_at: string;
}

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  user: User;
  setRefresh: () => void;
}

const MdlDelUsr: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  user,
  setRefresh,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [massage, setMassage] = useState("");

  const handleCloseUser = () => {
    if (type == "success") {
      setInfoModalOpen(false);
      handleClose();
      setRefresh();
    } else {
      setInfoModalOpen(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/user/${user.id}/delete`, {
        method: "DELETE",
        body: JSON.stringify(user),
      });
      if (response.status === 200) {
        setInfoModalOpen(true);
        setType("success");
        setMassage("User has been deleted.");
      } else {
        setInfoModalOpen(true);
        setType("error");
        setMassage("An error occurred while deleting the user.");
      }
    } catch (err) {
      setInfoModalOpen(true);
      setType("error");
      setMassage("An error occurred while deleting the user." + err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isInfoModalOpen}
        onClose={handleCloseUser}
        message={massage}
        type={type}
      />
      <Dialog
        open={isOpen}
        onClose={handleClose}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
          <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>
          <DialogPanel className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
            <div className="bg-white items-center justify-center px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex items-center">
                <div className="mt-3 text-center w-full ">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-red-600"
                  >
                    Delete User
                  </DialogTitle>
                  <div className="mx-auto flex items-center justify-center rounded-full sm:mx-0 sm:flex-shrink-0 sm:h-12 sm:w-12 sm:items-center sm:justify-center bg-red-100 sm:bg-red-200">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-2">
                    <p>Are you sure you want to delete {user.username}?</p>
                    {error && <p className="text-red-500">{error}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto bg-gradient-to-tl from-red-600 to-red-500 hover:bg-red-700"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes"}
              </button>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto bg-gradient-to-tl from-blue-600 to-blue-500 hover:bg-blue-700"
                onClick={handleClose}
                disabled={isDeleting}
              >
                No
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default MdlDelUsr;
