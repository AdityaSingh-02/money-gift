"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setEventDetails } from '@/store/slices/unique';
import { Button } from '@/components/ui/button';
import { AddGuestDialog } from '@/components/AddGuest';
import { useToast } from '@/components/ui/use-toast';

interface IEvents {
  id: string;
  userId: string;
  eventName: string;
  eventDate: string;
  eventVenue: string;
  isUpcomming: boolean;
  createdAt: string;
}

const page = () => {
  const path = usePathname();
  const p = path.split("/")[3];

  const dispatch = useAppDispatch();
  const eventState = useAppSelector(state => state.uniqueEvent);
  const [guestData, setGuestData] = useState({ name: "", email: "", mobile: "" });
  const { toast } = useToast()
  useEffect(() => {
    if (!p || p === "") return;
    if (eventState.id === p) return;
    axios.post("/api/event/eventbyid", { id: p })
      .then(res => {
        dispatch(setEventDetails(res.data.body.data));
      })
  }, []);

  const handleClick = () => {
    if (guestData.email === "" || guestData.mobile === "") {
      toast({
        title: "invalid datails",
        description: "Please enter valid details",
        variant: 'destructive'
      });
      return;
    }
    axios.post("/api/event/addguest", { eventId: eventState.id || p, guestName: guestData.name, guestEmail: guestData.email, guestMobile: guestData.mobile })
      .then(res => {
        console.log(res.data.body.data);
        if (res.data.status === 200) {
          toast({
            title: "Guest Added",
            description: "Guest added successfully",
          });
        }
      })
  }

  return (
    <>
      <div className='p-10'>
        <div>
          <h1 className='text-2xl font-bold'>Event: {eventState?.eventName}</h1>
          <p>{eventState?.eventDate}</p>
          <p>{eventState?.eventVenue}</p>
          {JSON.stringify(guestData)}
          <AddGuestDialog onClick={handleClick} setGuestData={setGuestData} data={guestData} />
        </div>
      </div>
    </>
  )
}

export default page