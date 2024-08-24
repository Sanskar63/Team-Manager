import React, { useEffect, useState } from 'react';
import ConfirmationModal from './ConfirmationalModel';

const TableCellWithActions = ({ rowId, handleDelete, handleEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteWithConfirmation = (e) => {
    // e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleEditClick = (e) => {
    // e.stopPropagation();
    handleEdit(rowId);
  };

  const confirmDelete = () => {
    handleDelete(rowId);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full h-full flex justify-evenly">

        <button onClick={handleDeleteWithConfirmation} className="hover:scale-[110%] duration-200 cursor-pointer h-full w-[48%] flex justify-center items-center">
          <img src="delete.png" className="w-5" alt="Delete" />
        </button>

        <button onClick={handleEditClick} className="hover:scale-[110%] duration-200 cursor-pointer h-full w-[48%] flex justify-center items-center">
          <img src="pencil.png" className="w-5 " alt="Edit" />
        </button>
      </div>

      {isModalOpen && <ConfirmationModal
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
      }
    </>
  );
};

export default TableCellWithActions;
