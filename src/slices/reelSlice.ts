import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReelWrapperState } from "../interfaces/reel/reelInterface";
import { createReelByApi, getAllReelsFromApi, getReelsByUserIdFromApi } from "../apis/reel/reelApi";

const initialState: ReelWrapperState = {
  reelData: [
    {
      id: -1,
      title: "",
      video: "",
      description: "",
      user: 0,
      createdAt: "",
      updatedAt: "",
    },
  ],
  loading: false,
  error: null,
};

// Thunks
export const getAllReels = createAsyncThunk(
  "allReels",
  async (_, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await getAllReelsFromApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);


export const createReel = createAsyncThunk(
  "createReel",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await createReelByApi(data);
      navigate("/");
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

const reelSlice = createSlice({
  name: "reel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReels.fulfilled, (state, action) => {
        state.loading = false;
        const reelData = action.payload.data;
        // debugger;
        state.reelData = reelData;
      })
      .addCase(getAllReels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createReel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReel.fulfilled, (state, action) => {
        state.loading = false;
        const reelData = action.payload.data;
        state.reelData.push(reelData);
      })
      .addCase(createReel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const {} = reelSlice.actions;

export default reelSlice;
