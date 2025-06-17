import React from "react";
import { Button } from "./ui/button";
import { format } from "date-fns";

interface IProps {
  eventTitle: string;
  eventDate?: string;
  onClick?: () => void;
  isHeader?: boolean;
}

const Card = ({ eventTitle, eventDate, onClick, isHeader = false }: IProps) => {
  const date = new Date(eventDate || "01/01/2002");

  const timeFormat = isHeader ? "When?" : format(date, "dd/MM/yyyy");

  const time = date.toLocaleTimeString("en-IN");

  return (
    <>
      <div className="w-[80%] mx-auto py-3 px-5 rounded-2xl bg-gray-700">
        <div className="space-x-3 items-center grid grid-cols-4">
          <h1 className="text-lg font-bold">{eventTitle}</h1>
          <h1 className="text-lg">{timeFormat}</h1>
          {isHeader ? (
            <h1 className="text-lg font-bold">Time</h1>
          ) : (
            <h1 className="text-lg">{time}</h1>
          )}
          {isHeader ? (
            <h1 className="text-lg font-bold">Action</h1>
          ) : (
            <Button onClick={onClick}>Manage Event</Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
