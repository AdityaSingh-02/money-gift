import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';

interface EventState {
    id: string;
    userId: string;
    eventName: string;
    eventDate: string;
    eventVenue: string;
    isUpcomming: boolean;
    createdAt: string;
}

const initialState: EventState = {
    id: "",
    userId: "",
    eventName: "",
    eventDate: "",
    eventVenue: "",
    isUpcomming: false,
    createdAt: ""
};

export const uniqueEventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEventDetails: (state, action) => {
            state = action.payload;
            return state;
        }
    }
});

export const { setEventDetails } = uniqueEventSlice.actions;
export default uniqueEventSlice.reducer;