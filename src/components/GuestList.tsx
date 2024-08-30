"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { format } from 'date-fns';
import Link from 'next/link';
import { MakePaymentDialog } from './MakePaymentDialog';
import { useAppSelector } from '@/store/hooks';
import axios from 'axios';
import { useToast } from './ui/use-toast';

interface IGuestListCard {
    id: string;
    guestName: string
    guestMobile: string;
    guestEmail: string;
}

const GuestListCard = ({ id, guestEmail, guestMobile, guestName }: IGuestListCard) => {
    const userState = useAppSelector(state => state.user);
    const [amount, setAmount] = useState<number>(0);
    const { toast } = useToast();
    const makePayment = () => {
        axios.post("/api/event/makepayment", { adminId: userState.id, to: id, amount: amount })
            .then(res => {
                if (res.data.status === 200) {
                    toast({
                        title: "Payment Successfull"
                    })
                }
            })
    }
    return (
        <>
            <div className='w-[80%] mx-auto py-3 px-5 rounded-2xl bg-gray-700'>
                <div className='flex space-x-3 items-center justify-between'>
                    <h1 className='text-lg font-bold w-40'>{guestName}</h1>
                    <p className='text-lg w-52'>{guestEmail}</p>
                    <p className='text-lg w-40'>{guestMobile}</p>
                    <Link href={`/${id}`} target='__blank'><Button className=''>Guest Portal</Button></Link>
                    <MakePaymentDialog email={userState.email} mobile={userState.mobile} name={userState.name} onClick={makePayment} setAmount={setAmount} />
                </div>
            </div>
        </>
    )
}

export default GuestListCard