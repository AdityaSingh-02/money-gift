"use client"
import Card from '@/components/Card'
import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import { useAppSelector } from '@/store/hooks'
import { USERID } from '@/cache/constants'

interface IEvents {
  id: string;
  userId: string;
  eventName: string;
  eventDate: string;
  eventVenue: string;
  isUpcomming: boolean;
  createdAt: string;
}

const Events = () => {

  const router = useRouter();
  const path = usePathname();
  const handleClick = (event: any) => {
    router.push(`/dashboard/events/${event}`)
  }

  const [eventMap, setEventMap] = React.useState<IEvents[]>([]);
  const uid = USERID.get();
  useEffect(() => {
    axios.post("/api/event/get", { id: uid })
      .then(res => {
        if (res.data.status === 200) {
          setEventMap(res.data.data.events);
        }
      })
  }, [uid])

  return (
    <>
      <div className='w-screen '>
        <h1 className='text-2xl font-bold'>Manage Events</h1>
        <div className='flex h-screen justify-center items-center'>
          <div className='bg-gray-900 rounded-lg h-[80%] w-[70%] flex pt-10 flex-col space-y-4 items-start overflow-scroll'>
            {eventMap.map((event, index) => (
              <Card key={index} eventDate={event.eventDate} eventTitle={event.eventName} onClick={() => handleClick(event.id)} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Events
