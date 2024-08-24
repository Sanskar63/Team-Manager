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
      <div className="flex justify-evenly">
        <button onClick={handleDeleteWithConfirmation} className="cursor-pointer">
          <img src="delete.png" className="w-5 hover:scale-[110%] duration-200 active:scale-[100%]" alt="Delete" />
        </button>
        <button onClick={handleEditClick} className="cursor-pointer">
          <img src="pencil.png" className="w-5 hover:scale-[110%] duration-200" alt="Edit" />
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
