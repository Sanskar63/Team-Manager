import React from 'react'

const Navbar = () => {
  return (
    <div className='w-[100%] h-[8vh] border-b border-gray-200 flex justify-between items-center px-[3%] '>
        <span className='text-3xl font-bold text-purple'>PEOPLE.CO</span>
        <div className='flex items-center gap-2'>

            <img src="snowMountain.jpg" className='w-11 h-11 rounded-full' alt="" />
            <span>Jane Doe</span>
        </div>
    </div>
  )
}

export default Navbar
