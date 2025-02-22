import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserWrapperState } from "../interfaces/user/userInterfaces";
import {
  followUnfollowUserFromApi,
  getPostsByUserIdFromApi,
  getReelsByUserIdFromApi,
  getSavedPostsByUserIdFromApi,
  getUserDetailsByTokenApi,
} from "../apis/user/userApi";
import { RAND_IMG } from "../config/config";
import { getAllStoryForUser } from "./storySlice";

const initialState: UserWrapperState = {
  userData: {
    id: -1,
    email: "",
    userName: "",
    firstName: "",
    lastName: "",
    gender: null,
    profileImg: "",
    phone: 0,
    followers: [],
    followings: [],
    posts: [],
    reels: [],
    savedPost: [],
    stories: [],
  },
  loading: false,
  error: null,
};

// Thunks

export const getUserDetailsByToken = createAsyncThunk(
  "userDetails",
  async (_, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await getUserDetailsByTokenApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
export const getPostsByUserId = createAsyncThunk(
  "postByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await getPostsByUserIdFromApi(userId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const getReelsByUserId = createAsyncThunk(
  "reelByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await getReelsByUserIdFromApi(userId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const getSavedPostsByUserId = createAsyncThunk(
  "getSavedPostsByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await getSavedPostsByUserIdFromApi(userId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const followUnfollowUser = createAsyncThunk(
  "followUnfollowUser",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      // debugger;
      const response = await followUnfollowUserFromApi(userId);

      dispatch(getAllStoryForUser());
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    appendStoryForUser: (state, action) => {
      state.userData.stories.push(action.payload);
    },
    setStoriesForUser: (state, action) => {
      console.log("stories", action.payload);
      state.userData.stories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetailsByToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetailsByToken.fulfilled, (state, action) => {
        state.loading = false;
        // debugger;
        const userData = action.payload.data;

        // userData["imgLink"] = userData.profileImg;
        userData["userName"] = userData.firstName + userData.lastName + "69";
        state.userData = userData;
        // state.id = userData.id;
        // state.email = userData.email;
        // state.username = userData.username;
        // state.firstName = userData.firstName;
        // state.lastName = userData.lastName;
        // state.gender = userData.gender;
        // state.imgLink = userData.imgLink || RAND_IMG;
        // state.phone = userData.phone;
        // state.followers = userData.followers || [];
        // state.followings = userData.followings || [];
      })
      .addCase(getUserDetailsByToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getPostsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        const postData = action.payload.data;
        state.userData.posts = postData;
      })
      .addCase(getPostsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getReelsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReelsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        const reelData = action.payload.data;
        // debugger;
        state.userData.reels = reelData;
      })
      .addCase(getReelsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getSavedPostsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSavedPostsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userData.savedPost = action.payload.data;
      })
      .addCase(getSavedPostsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(followUnfollowUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(followUnfollowUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.data;
      })
      .addCase(followUnfollowUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { appendStoryForUser, setStoriesForUser } = userSlice.actions;

export default userSlice;
