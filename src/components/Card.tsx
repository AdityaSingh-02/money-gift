import React from 'react'
import { Button } from './ui/button'
import { format } from 'date-fns';

interface IProps {
    eventTitle: string;
    eventDate: string;
    onClick: () => void;
}

const Card = ({eventTitle, eventDate, onClick}: IProps) => {
    return (
        <>
            <div className='w-[80%] mx-auto py-3 px-5 rounded-2xl bg-gray-700'>
                <div className='flex space-x-3 items-center justify-between'>
                    <h1 className='text-lg font-bold'>{eventTitle}</h1>
                    <p className='text-lg'>{format(eventDate, 'MM/dd/yyyy')}</p>
                    <Button onClick={onClick}>Manage Event</Button>
                </div>
            </div>
        </>
    )
}

export default Card