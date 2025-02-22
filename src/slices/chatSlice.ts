import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatWrapper } from "../interfaces/chats/chatInterface";
import {
  getAllChatsForCurrUserFromApi,
  getChatByIdFromApi,
} from "../apis/chat/chatApis";

const initialState: ChatWrapper = {
  allChats: [],
  selectedChat: {
    id: -1,
    chatName: "",
    image: "",
    users: [],
    messages: [],
    createdAt: "",
    updatedAt: "",
  },
  loading: false,
  error: null,
};

// Thunks
export const getAllChatsForCurrUser = createAsyncThunk(
  "getAllChatsForCurrUser",
  async (_, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await getAllChatsForCurrUserFromApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);
export const getChatById = createAsyncThunk(
  "getChatById",
  async (chatId, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await getChatByIdFromApi(chatId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      console.log(action);

      state.selectedChat = action.payload;
    },
    setMessagesInSelectedChat: (state, action) => {
      state.selectedChat.messages = action.payload;
    },
    appendMessageInSelectedChat: (state, action) => {
      console.log(action.payload);
      
      state.selectedChat.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChatsForCurrUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllChatsForCurrUser.fulfilled, (state, action) => {
        state.loading = false;
        state.allChats = action.payload.data;
      })
      .addCase(getAllChatsForCurrUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getChatById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedChat = action.payload.data;
      })
      .addCase(getChatById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedChat, setMessagesInSelectedChat, appendMessageInSelectedChat } = chatSlice.actions;

export default chatSlice;
