"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { useAppDispatch } from "@/store/hooks";
import { addDays, format } from "date-fns";
import { setEventDate, setEventTime } from "@/store/slices/event";

export function CalenderDatePicker() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState<String | undefined>(
    new Date().toLocaleTimeString()
  );

  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal">
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex w-auto flex-col space-y-2 p-2">
            <Select
              onValueChange={(value) => {
                setDate(addDays(new Date(), parseInt(value)));
                dispatch(
                  setEventDate(
                    format(addDays(new Date(), parseInt(value)), "MM/dd/yyyy")
                  )
                );
              }}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="0">Today</SelectItem>
                <SelectItem value="1">Tomorrow</SelectItem>
                <SelectItem value="3">In 3 days</SelectItem>
                <SelectItem value="7">In a week</SelectItem>
              </SelectContent>
            </Select>
            <div className="rounded-md border">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selected) => {
                  setDate(selected);
                  setOpen(false);
                  dispatch(setEventDate(format(selected!, "MM/dd/yyyy")));
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Input
          type="time"
          id="time-picker"
          step="1"
          defaultValue={time?.toString()}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          onChange={(e) => {
            setTime(e.target.value);
            dispatch(setEventTime(e.target.value));
          }}
        />
      </div>
    </div>
  );
}
