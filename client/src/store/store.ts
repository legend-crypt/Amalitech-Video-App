import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userAuth";

export const store = configureStore({
    reducer: {
        userAuth: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

