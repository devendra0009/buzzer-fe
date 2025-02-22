import { configureStore } from "@reduxjs/toolkit";
import rootCustomReducer from "../reducers/rootCustomReducer";

export const store=configureStore({
    reducer: rootCustomReducer,
    devTools: true 
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;