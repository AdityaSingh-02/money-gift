"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/user";
import { getClientData } from "@/utils/getClientData";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CreateEventDialog } from "@/components/CreateEventDialog";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { USERID } from "@/cache/constants";
import { format } from "date-fns";

const DashBoard = () => {
  const userState = useAppSelector((state) => state.user);
  const eventState = useAppSelector((state) => state.event);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();

  const signout = () => {
    localStorage.removeItem("gift-app-token");
    router.push("/");
  };

  const handleClick = () => {
    if (
      eventState.eventName === "" ||
      eventState.date === "" ||
      eventState.eventVenue === "" ||
      eventState.eventTime === ""
    ) {
      toast({
        title: "Invalid Fields",
        variant: "destructive",
      });
      return;
    }
    const payload = {
      userId: userState.id,
      eventName: eventState.eventName,
      date: `${eventState.date}, ${eventState.eventTime}`,
      eventVenue: eventState.eventVenue,
    };
    axios.post("/api/event/create", payload).then((res) => {
      if (res.data.status === 200) {
        toast({
          title: "Event created successfully",
        });
      }
    });
  };

  useEffect(() => {
    const resolve = async () => {
      const tkn = localStorage.getItem("gift-app-token");
      const res = await getClientData(tkn!);
      // @ts-ignore
      USERID.set(res.data?.id);
      dispatch(setUser(res.data));
    };
    resolve();
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-4 p-4 h-screen w-screen">
        <div className="flex space-x-6 p-10 justify-end">
          <span className="flex flex-row space-x-5">
            <Link href={"/dashboard/transactions"}>
              <Button>See Contributions</Button>
            </Link>
            <Button onClick={signout}>Sign Out</Button>
          </span>
        </div>
        <div className="flex flex-col juctify-center items-center space-y-2">
          <h1 className="text-4xl">Manage all your events at a single place</h1>
          <span className="items-center flex space-x-6 p-6">
            <CreateEventDialog onClick={handleClick} />
            <Link href={"/dashboard/events"}>
              <Button>Manage Events</Button>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
