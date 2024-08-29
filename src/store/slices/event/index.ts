import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';

interface EventState {
    eventName: string;
    date: string;
    eventVenue: string;
}

const initialState: EventState = {
    eventName: "",
    date: format(new Date(), 'MM/dd/yyyy'),
    eventVenue: ""
};

export const eventSlice = createSlice({
    name: 'event',
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
    }
});

export const { setEventName, setEventDate, setEventVenue } = eventSlice.actions;
export default eventSlice.reducer;