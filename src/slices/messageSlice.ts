import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createMessageForChatFromApi,
  getAllMessagesByChatIdFromApi,
} from "../apis/messages/messageApi";
import {
  appendMessageInSelectedChat,
  setMessagesInSelectedChat,
} from "./chatSlice";
import { MessageStateWrapper } from "../interfaces/messages/messageInterface";

const initialState:MessageStateWrapper = {
  messages: [],
  loading: false,
  error: null,
};

// Thunks
export const getAllMessagesByChatId = createAsyncThunk(
  "getAllMessagesByChatId",
  async (chatId: number, { rejectWithValue, dispatch }) => {
    try {
      // debugger;
      const response = await getAllMessagesByChatIdFromApi(chatId);
      dispatch(setMessagesInSelectedChat(response.data));
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);
export const createMessageForChat = createAsyncThunk(
  "createMessageForChat",
  async (reqData, { rejectWithValue, dispatch }) => {
    try {
      // debugger;
      const response = await createMessageForChatFromApi(reqData);
      // dispatch(appendMessageInSelectedChat(response.data));

      // sending message through websocket -> getting triggered multiple times bug
      reqData.sendMsgToServer(response.data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessagesByChatId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMessagesByChatId.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllMessagesByChatId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createMessageForChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMessageForChat.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createMessageForChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const { } = messageSlice.actions;

export default messageSlice;
