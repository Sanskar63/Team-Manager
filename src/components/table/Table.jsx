'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import PersonDetailsModal from './PersonDetailsModal';
import ReactHookFormWithZod from '../form/Form';

export default function BasicTable({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      pagination: pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onPaginationChange: setPagination,
  });

  // Related to opening window
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formWindow, setFormWindow] = useState(false);

  // useEffect(()=>{
  //   console.log(formWindow);
  // },[formWindow])

  
  const handleRowClick = (person, e) => {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'IMG') {
      setSelectedPerson(person);
      setIsOpen(true);
    }
  };

  return (
    <div className='flex flex-col w-[89%] mt-2 p-2'>
      <div className='flex justify-between items-center px-[2%] h-[10vh] rounded-t-md border border-gray-300'>
        <div className='flex items-center gap-4'>
          <span className='font-semibold text-xl'>Team members</span>
          <span className='border border-purple rounded-full px-3 text-sm text-purple font-semibold'>{data.length} users</span>
        </div>

        <div className='flex items-center gap-4'>
          <input
            type='text'
            value={filtering}
            placeholder='Search...'
            onChange={e => setFiltering(e.target.value)}
            className='border border-gray-300 rounded-md px-2 h-[5vh]'
          />

          <img src="filter.png" className='w-8 h-7' alt="" />

          <button onClick={()=>setFormWindow(true)} className='font-bold bg-purple-700 px-6 py-2 rounded-md text-white bg-purple'>+ ADD MEMBER</button>
        </div>
      </div>

      <table className="border border-gray-300">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="w-[100%] h-[5vh]">
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div className="px-3 text-start text-gray-600 cursor-pointer">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: '  🔼', desc: '  🔽' }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="h-[6vh] lg:h-[9vh] border border-gray-300 cursor-pointer"
              onClick={(e) => handleRowClick(row.original, e)}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="text-xs lg:text-sm w-[18%] lg:w-[23%] px-2 text-gray-600">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex flex-row-reverse items-center gap-2 mt-5'>
        <button
          className='bg-purple text-white px-4 py-2 rounded-lg hover:scale-[102%] duration-150 active:scale-[100%]'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          Last page
        </button>

        <button
          className='bg-purple text-white px-4 py-2 rounded-lg hover:scale-[102%] duration-150 active:scale-[100%]'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next page
        </button>

        <button
          className='bg-purple text-white px-4 py-2 rounded-lg hover:scale-[102%] duration-150 active:scale-[100%]'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous page
        </button>

        <button
          className='bg-purple text-white px-4 py-2 rounded-lg hover:scale-[102%] duration-150 active:scale-[100%]'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          First page
        </button>
      </div>

      <PersonDetailsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        person={selectedPerson}
      />
      {
        formWindow && <ReactHookFormWithZod onClose={() => setFormWindow(false)} />
      }
      
    </div>
  )
}
