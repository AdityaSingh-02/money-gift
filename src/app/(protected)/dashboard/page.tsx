"use client"
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUser } from '@/store/slices/user';
import { getClientData } from '@/utils/getClientData';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CreateEventDialog } from '@/components/CreateEventDialog';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { USERID } from '@/cache/constants';

const DashBoard = () => {
  const userState = useAppSelector(state => state.user)
  const eventState = useAppSelector(state => state.event)
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();

  const signout = () => {
    localStorage.removeItem("gift-app-token");
    router.push("/");
  }

  const handleClick = () => {
    if (eventState.eventName === "" || eventState.date === "" || eventState.eventVenue === "") {
      toast({
        title: "Invalid Fields",
        variant: "destructive"
      });
      return;
    }
    const payload = {
      userId: userState.id,
      eventName: eventState.eventName,
      date: eventState.date,
      eventVenue: eventState.eventVenue
    }
    axios.post("/api/event/create", payload)
      .then(res => {
        if (res.data.status === 200) {
          toast({
            title: "Event created successfully",
          });
        }
      })
  }

  useEffect(() => {
    const resolve = async () => {
      const tkn = localStorage.getItem("gift-app-token");
      const res = await getClientData(tkn!);
      // @ts-ignore
      USERID.set(res.data?.id);
      dispatch(setUser(res.data));
    }
    resolve();
  }, [])

  return (
    <>
      <div>
        <h1 className='text-2xl'>Welcome, Let's Create and Manage events</h1>
        <div className='flex space-x-6 p-10'>
          <CreateEventDialog onClick={handleClick} />
          <Link href={"/dashboard/events"}><Button>Manage Events</Button></Link>
          
          <Button onClick={signout}>Sign Out</Button>
        </div>
      </div>
    </>
  )
}

export default DashBoard