import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";

interface EventState {
  eventName: string;
  date: string;
  eventVenue: string;
  eventTime: string;
}

const initialState: EventState = {
  eventName: "",
  date: format(new Date(), "MM/dd/yyyy"),
  eventVenue: "",
  eventTime: format(new Date(), "HH:mm:ss"),
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventName: (state, action: PayloadAction<string>) => {
      state.eventName = action.payload;
    },
    setEventDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setEventVenue: (state, action: PayloadAction<string>) => {
      state.eventVenue = action.payload;
    },
    setEventTime: (state, action: PayloadAction<string>) => {
      state.eventTime = action.payload;
    },
  },
});

export const { setEventName, setEventDate, setEventVenue, setEventTime } =
  eventSlice.actions;

export default eventSlice.reducer;
