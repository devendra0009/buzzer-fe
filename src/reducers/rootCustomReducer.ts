import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import userSlice from "../slices/userSlice";
import reelSlice from "../slices/reelSlice";
import postSlice from "../slices/postSlice";
import chatSlice from "../slices/chatSlice";
import messageSlice from "../slices/messageSlice";

const rootCustomReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  reel: reelSlice.reducer,
  post: postSlice.reducer,
  chat: chatSlice.reducer,
  message: messageSlice.reducer,
});

export default rootCustomReducer;
