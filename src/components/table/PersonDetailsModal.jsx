import React from 'react';

const PersonDetailsModal = ({ onClose, person }) => {
  if (!person) return null;

  return (
    <div className="fixed right-0 w-[50%] h-[88%] flex items-center justify-center z-50">

      <div className="bg-white overflow-hidden rounded-lg border border-gray-300 h-full w-[97%]">

        {/* Top part */}
        <div className="flex p-6 bg-back gap-10 relative">
          <img
            src={person.profilePicture}
            alt={person.name}
            className="w-24 h-24 rounded-full"
          />

          <div className='flex flex-col justify-center'>
            <p className="text-white font-bold text-xl ">{person.name}</p>
            <div className='flex gap-4 items-center'>
              <div>
                <p className="text-white text-sm">@{person.user_id}</p>
                <p className="text-white text-sm">User ID</p>
              </div>

              <div className='h-[80%] border-l border-white' />

              <div>
                <p className="text-white text-sm ">{person.role}</p>
                <p className="text-white text-sm ">Role</p>
              </div>
            </div>

          </div>

          <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="p"
          >
            <img src="closeWhite.png" className='w-4 top-6 right-6 absolute hover:scale-[115%] duration-200' alt="" />
          </button>
        </div>
        </div>


        <table className='w-[98%] mx-auto'>
          <thead>
            <th className='py-3 w-[35%] text-gray-800 text-lg'>Personal Information</th>
          </thead>
          <tbody className=''>
            <tr className='h-10 text-lg text-gray-600 border-b border-gray-300'>
              <td>Date of Birth</td>
              <td>{person.DOB}</td>
            </tr>

            <tr className='h-10 text-lg text-gray-600 border-b border-gray-300'>
              <td>Gender</td>
              <td>{person.gender}</td>
            </tr>

            <tr className='h-10 text-lg text-gray-600 border-b border-gray-300'>
              <td>Nationality</td>
              <td>{person.nationality}</td>
            </tr>

            <tr className='h-10 text-lg text-gray-600 border-b border-gray-300'>
              <td>Contack No.</td>
              <td>{person.contact}</td>
            </tr>

            <tr className='h-10 text-lg text-gray-600 border-b border-gray-300'>
              <td>Email Address</td>
              <td>{person.email}</td>
            </tr>

            <tr className='h-10 text-lg text-gray-600 border-b border-gray-300'>
              <td>Work Email Address</td>
              <td>{person.email}</td>
            </tr>


          </tbody>
        </table>
        
        
      </div>
    </div>
  );
};

export default PersonDetailsModal;
