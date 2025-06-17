"use client";
import Card from "@/components/Card";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useAppSelector } from "@/store/hooks";
import { USERID } from "@/cache/constants";
import { Loading } from "@/components/Loading";

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
  const [eventMap, setEventMap] = React.useState<IEvents[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleClick = (event: any) => {
    router.push(`/dashboard/events/${event}`);
  };

  const uid = USERID.get();

  const render_items = (
    <>
      {eventMap.length ? (
        eventMap.map((event, index) => (
          <Card
            key={index}
            eventDate={event.eventDate}
            eventTitle={event.eventName}
            onClick={() => handleClick(event.id)}
          />
        ))
      ) : (
        <div className="text-white mx-auto text-lg font-semibold">
          No events found
        </div>
      )}
    </>
  );

  useEffect(() => {
    axios.post("/api/event/get", { id: uid }).then((res) => {
      if (res.data.status === 200) {
        setLoading(false);
        setEventMap(res.data.data.events);
      }
    });
  }, [uid]);

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4 p-4">
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <div className="flex min-h-screen bg-gray-900 rounded-lg w-[70%] pt-10 flex-col space-y-4 items-start overflow-scroll">
          <Card key={"heading"} eventTitle="Title" isHeader={true} />
          {loading ? <Loading /> : render_items}
        </div>
      </div>
    </>
  );
};

export default Events;
