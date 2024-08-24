'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const Sidebar = () => {
    const [currentPath, setCurrentPath] = useState('')

    useEffect(() => {
        // Check if running in the browser (not during SSR)
        if (typeof window !== 'undefined') {
            setCurrentPath(window.location.pathname)
        }
    }, [])

    return (
        <div className='lg:w-[15%] flex flex-col gap-2 pt-2 pl-2'>
            <Link href='/' className='flex gap-2 items-center'>
                {currentPath === '/' ? <img className='w-5' src='optionPurple.png' /> : <img className='w-5' src='optionBlack.png' />}
                <span
                    className={`font-semibold hover:scale-[101%] cursor-pointer ${currentPath === '/' ? 'text-purple' : 'text-gray-700'
                        }`}
                >
                    Overview
                </span>
            </Link>

            <Link href='/people' className='flex gap-2 items-center'>
                {currentPath === '/people' ? <img className='w-5' src='optionPurple.png' /> : <img className='w-5' src='optionBlack.png' />}
                <span
                    className={`font-semibold hover:scale-[101%] cursor-pointer ${currentPath === '/people' ? 'text-purple' : 'text-gray-700'
                        }`}
                >
                    People Directory
                </span>
            </Link>
            {/* Add more links as needed */}
        </div>
    )
}

export default Sidebar
