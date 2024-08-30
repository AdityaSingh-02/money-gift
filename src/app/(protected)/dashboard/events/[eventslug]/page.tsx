"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setEventDetails } from '@/store/slices/unique';
import { Button } from '@/components/ui/button';
import { AddGuestDialog } from '@/components/AddGuest';
import { useToast } from '@/components/ui/use-toast';
import Card from '@/components/Card';
import GuestListCard from '@/components/GuestList';

interface IGuest {
  id: string;
  guestName: string;
  guestEmail: string;
  guestMobile: string;
}

const page = () => {
  const path = usePathname();
  const p = path.split("/")[3];

  const dispatch = useAppDispatch();
  const eventState = useAppSelector(state => state.uniqueEvent);
  const [guestData, setGuestData] = useState({ name: "", email: "", mobile: "" });
  const [guestList, setGuestList] = useState<IGuest[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!p || p === "") return;
    if (eventState.id === p) return;
    axios.post("/api/event/eventbyid", { id: p })
      .then(res => {
        dispatch(setEventDetails(res.data.body.data));
      });
  }, []);

  useEffect(() => {
    if (!p || p === "") return;
    if (eventState.id === p) return;
    axios.post("/api/event/guests", { eventId: p })
      .then(res => {
        setGuestList(res.data.body.data);
      })
  }, [])

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
        if (res.data.status === 200) {
          setGuestList((prev: any) => [...prev, res.data.body.data]);
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
          <AddGuestDialog onClick={handleClick} setGuestData={setGuestData} data={guestData} />
          <div className='flex h-screen justify-center items-center'>
            <div className='bg-gray-900 rounded-lg h-[80%] w-[70%] flex pt-10 flex-col space-y-4 items-start overflow-scroll'>
              {guestList.map((guest: IGuest, index: number) => (
                <GuestListCard key={index} id={guest.id} guestEmail={guest.guestEmail} guestMobile={guest.guestMobile} guestName={guest.guestName} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page