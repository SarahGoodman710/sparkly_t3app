import Modal from "./Modal";
import { useState } from "react";

const TableAddButton = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        onClick={() => setIsOpen(true)}
      >
        {text}
      </button>
    </div>
  );
};

export default TableAddButton;
