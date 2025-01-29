import React, { useState } from "react";
import axios from "axios";
import InfoModal from "../InfoModal/Modal";

interface ModalProps {
  onClose: () => void;
  setRefresh: () => void;
}

const FormInput: React.FC<ModalProps> = ({ setRefresh, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClose = () => {
    if (type === "success") {
      onClose();
      setRefresh();
      setInfoModalOpen(false);
    } else {
      setInfoModalOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      setType("error");
      setMessage("Passwords do not match.");
      setIsSubmitting(false);
      setInfoModalOpen(true);
      return;
    }

    try {
      const response = await axios.post("/api/uploadUsr", {
        username,
        password,
      });

      if (response.status === 200) {
        setType("success");
        setMessage("User successfully saved!");
      } else {
        setType("error");
        setMessage("Failed to save user.");
      }
    } catch (error: unknown) {
      setType("error");
      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data?.message ||
            "An error occurred while saving the user."
        );
      } else {
        setMessage("An error occurred while saving the user.");
      }
    } finally {
      setIsSubmitting(false);
      setInfoModalOpen(true);
    }
  };

  return (
    <>
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={handleClose}
        message={message}
        type={type}
      />
      <form onSubmit={handleSubmit} className="p-4 md:p-5">
        {/* Grid 2 columns */}
        <div className="grid gap-6 mb-4">
          {/* Nama */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Password */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${
              isSubmitting
                ? "bg-gradient-to-tl from-gray-100 to-gray-100 cursor-not-allowed"
                : "bg-gradient-to-tl from-blue-500 to-blue-500 text-white hover:bg-gradient-to-tl hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500"
            } text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            Simpan
          </button>
        </div>
      </form>
    </>
  );
};

export default FormInput;
