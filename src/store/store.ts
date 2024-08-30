import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/user"
import eventSlice from "./slices/event";
import uniqueEventSlice from "./slices/unique";
export const store = configureStore({
    reducer: {
        user: userSlice,
        event: eventSlice,
        uniqueEvent: uniqueEventSlice
    },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
