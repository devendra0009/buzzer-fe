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
import {
  StoryRequest,
  StoryWrapperState,
} from "../interfaces/story/storyInterfaces";
import {
  createStoryFromApi,
  getAllStoryForUserFromApi,
  getAllStoryOfUserFromApi,
} from "../apis/story/storyApis";
import { appendStoryForUser, setStoriesForUser } from "./userSlice";

const initialState: StoryWrapperState = {
  stories: [],
  loading: false,
  error: null,
};

// Thunks

export const createStory = createAsyncThunk(
  "createStory",
  async (data: StoryRequest, { rejectWithValue, dispatch }) => {
    try {
      // debugger;
      const response = await createStoryFromApi(data);
      dispatch(appendStoryForUser(response.data));
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const getAllStoryForUser = createAsyncThunk(
  "getAllStoryForUser",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      // debugger;
      const response = await getAllStoryForUserFromApi();
      dispatch(setStoriesForUser(response.data));
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const getAllStoryOfUser = createAsyncThunk(
  "getAllStoryOfUser",
  async (userId: number, { rejectWithValue, dispatch }) => {
    try {
      // debugger;
      const response = await getAllStoryOfUserFromApi(userId); // this is to add story of the searched guy and add story of current guy
      dispatch(appendStoryForUser(response.data));
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllStoryForUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllStoryForUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllStoryForUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllStoryOfUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllStoryOfUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllStoryOfUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const { } = storySlice.actions;

export default storySlice;
