'use client'
import mockData from '@/MOCK_DATA.json';
import BasicTable from '@/components/table/Table';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';
import TableCellWithActions from '@/components/table/TableCellWithActions';

function Directory() {
    const [data, setData] = useState(mockData);

    const handleDelete = (rowId) => {
        setData((prevData) => prevData.filter(row => row.id !== rowId));
    };

    const handleEdit = (rowId) => {
        // Implement your edit logic here, possibly opening a modal or inline editing
        console.log('Edit row:', rowId);
    };

    // /** @type import('@tanstack/react-table').ColumnDef<any> */
    const columns = [
        {
            header: 'Name',
            accessorFn: row => row.name,
            footer: 'Profile',
            cell: info => {
                const { name, profilePicture, user_id } = info.row.original; // Adjust keys as per your data structure
                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={profilePicture}
                            alt={name}
                            style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
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
                    <TableCellWithActions
                        rowId={rowId}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
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
        </>
    );
}

export default Directory;
