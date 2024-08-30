"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios';
import { MakePaymentDialog } from '@/components/MakePaymentDialog';
import { Button } from '@/components/ui/button';
import { addDays, format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

interface IGuest {
    id: string;
    eventId: string;
    guestName: string;
    guestEmail: string;
    guestMobile: string;
}

interface IEvent {
    id: string;
    userId: string;
    eventName: string;
    eventDate: string;
    eventVenue: string;
    isUpcomming: boolean;
    createdAt: string;
}

const GuestPortal = () => {
    const path = usePathname().split("/")[1];
    const { toast } = useToast();
    const [guestData, setGuestData] = useState<IGuest>({
        id: "",
        eventId: "",
        guestName: "",
        guestEmail: "",
        guestMobile: ""
    });

    const [eventData, setEventData] = useState<IEvent>({
        id: "",
        userId: "",
        eventName: "",
        eventDate: "",
        eventVenue: "",
        isUpcomming: false,
        createdAt: ""
    })

    const [amount, setAmount] = useState<number>(0);


    useEffect(() => {
        axios.post("/api/guests/getguests", { guestId: path })
            .then(res => {
                setGuestData(res.data.body.data)
            });

        axios.post("/api/guests/getevent", { guestId: path })
            .then(res => {
                console.log(res.data.body.data)
                setEventData(res.data.body.data)
            })
    }, []);

    const makeContribution = () => {
        axios.post("/api/guests/send-gift", { guestId: path, amount: amount, adminId: eventData.userId })
            .then(res => {
                if (res.data.status === 200) {
                    toast({
                        title: "Gift sent",
                        description: "Gift sent successfully"
                    })
                }
            })
    }


    return (
        <>
            <div>
                <h1 className='text-2xl font-bold'>Guest Portal</h1>
                <h1 className='text-2xl font-bold'>Welcome {guestData.guestName}</h1>
                <p>You are invited to {eventData.eventName} at venue: {eventData.eventVenue} by: {eventData.userId} </p>
                <h1 className=''>{guestData.guestMobile}</h1>
                <MakePaymentDialog setAmount={setAmount} email={guestData?.guestEmail} mobile={guestData?.guestMobile} name={guestData?.guestName} onClick={makeContribution} />
            </div>
        </>
    )
}

export default GuestPortal