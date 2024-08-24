import React from 'react';

const ConfirmationModal = ({ onClose, onConfirm }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[40%]">
        <div className="flex flex-col justify-end gap-4">
          <div className='flex items-center justify-between'>
            <h2 className="text-xl text-black font-bold">Delete Member Details</h2>
            <button
              onClick={onClose}
              className=" text-2xl hover:scale-[110%]"
            >
              <img src="close.png" className='w-5' alt="" />
            </button>
          </div>

          <span>
            Are you sure you want to delete this Member details? This action cannot be undone.
          </span>

          <div className='flex flex-row-reverse'>
            <button
              onClick={onConfirm}
              className="px-8 py-3 bg-purple text-white rounded-md hover:scale-[105%] w-[20%] "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
