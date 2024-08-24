'use client'
import mockData from '@/MOCK_DATA.json';
import BasicTable from '@/components/table/Table';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react';
import TableCellWithActions from '@/components/table/TableCellWithActions';
import ReactHookFormWithZod from '@/components/form/Form';

function Directory() {
    const [data, setData] = useState(mockData);
    const [editWindow, setEditWindow] = useState(false);

    const handleDelete = (rowId) => {
        setData((prevData) => prevData.filter(row => row.id !== rowId));
    };

    const handleEdit = (rowId) => {
        // Editing logic goes here
        console.log('Edit row:', rowId);
        setEditWindow(true);
    };

    // useEffect(()=>{
    //     console.log(editWindow);
    // },[editWindow])

    const columns = [
        {
            header: 'Name',
            accessorFn: row => row.name,
            footer: 'Profile',
            cell: info => {
                const { name, profilePicture, user_id } = info.row.original;
                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={profilePicture}
                            alt={name}
                            className='w-8 h-8 md:w-12 md:h-12 rounded-full mr-2'
                        />
                        <div className='flex flex-col'>
                            <span className='text-black'>{name}</span>
                            <span>@{user_id}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            header: 'Role',
            accessorKey: 'role',
            footer: 'Role',
        },
        {
            header: 'Email',
            accessorKey: 'email',
            footer: 'Email',
        },
        {
            header: 'Teams',
            accessorKey: 'teams', // Ensure this matches the key in your data
            footer: 'Teams',
            cell: info => {
                const teams = info.getValue(); // Get the array of teams
                const displayedTeams = Array.isArray(teams) ? teams.slice(0, 3) : [];
                const remainingTeamsCount = Array.isArray(teams) ? teams.length - 3 : 0;

                return (
                    <div className='flex gap-1 lg:gap-2 items-center'>
                        {displayedTeams.map((team, index) => (
                            <span
                                key={index}
                                className={
                                    index === 0
                                        ? 'text-purple border border-purple text-xs px-1 lg:px-2 py-1 rounded-full'
                                        : index === 1
                                            ? 'text-blue-500 border border-blue-400 text-xs px-1 lg:px-2 py-1 rounded-full'
                                            : 'text-blue-800 border border-blue-800 text-xs px-1 lg:px-2 py-1 rounded-full'
                                }
                            >
                                {team}
                            </span>
                        ))}
                        {remainingTeamsCount > 0 && (
                            <span className='text-purple border border-purple px-1 py-1 lg:px-2 rounded-full'>
                                +{remainingTeamsCount}
                            </span>
                        )}
                    </div>
                );
            },
        },
        {
            header: ' ',
            cell: info => {
                const rowId = info.row.original.id;
                return (
                    <div className=' h-[6vh] lg:h-[9vh] flex items-center'>

                        <TableCellWithActions
                            rowId={rowId}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                <BasicTable
                    data={data}
                    columns={columns}
                />
            </div>
            {editWindow && <ReactHookFormWithZod onClose={() => setEditWindow(false)} />}
        </>
    );
}

export default Directory;
