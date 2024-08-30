import React from 'react'
import { Button } from './ui/button'
import { format } from 'date-fns';
import Link from 'next/link';

interface IGuestListCard {
    id: string;
    guestName: string
    guestMobile: string;
    guestEmail: string;
    onClick: () => void;
}

const GuestListCard = ({ id, guestEmail, guestMobile, guestName, onClick }: IGuestListCard) => {
    return (
        <>
            <div className='w-[80%] mx-auto py-3 px-5 rounded-2xl bg-gray-700'>
                <div className='flex space-x-3 items-center justify-between'>
                    <h1 className='text-lg font-bold w-40'>{guestName}</h1>
                    <p className='text-lg w-52'>{guestEmail}</p>
                    <p className='text-lg w-40'>{guestMobile}</p>
                    <Link href={`/${id}`} target='__blank'><Button className=''>Guest Portal</Button></Link>
                    <Button onClick={onClick}>+Add Gift</Button>
                </div>
            </div>
        </>
    )
}

export default GuestListCard