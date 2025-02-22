import { PostState } from "./../interfaces/post/postInterface";
import { UserState } from "./../interfaces/user/userInterfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  commentOnPostByApi,
  createPostByApi,
  getAllCommentsByPostByApi,
  getAllPostsFromApi,
  getPostsByUserIdFromApi,
  likeACommentByApi,
  liketPostByApi,
  savePostByApi,
} from "../apis/post/postApi";
import { PostWrapperState } from "../interfaces/post/postInterface";
import { useNavigate } from "react-router-dom";
import { CommentState } from "../interfaces/comment/commentInterface";

const initialState: PostWrapperState = {
  postData: [
    {
      id: -1,
      caption: "",
      mediaFiles: [],
      comments: [],
      user: {
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
      },
      tags: [],
      location: "",
      likedBy: [],
      savedBy: [],
      userTagged: [],
      createdAt: "",
      updatedAt: "",
    },
  ],
  loading: false,
  error: null,
};

// Thunks
export const getAllPosts = createAsyncThunk(
  "allPosts",
  async (_, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await getAllPostsFromApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const createPost = createAsyncThunk(
  "createPost",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await createPostByApi(data);
      navigate("/");
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const liketPost = createAsyncThunk(
  "liketPost",
  async (postId, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await liketPostByApi(postId);
      // navigate("/profile");
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const savePost = createAsyncThunk(
  "savePost",
  async (postId, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await savePostByApi(postId);
      // navigate("/profile");
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const commentOnPost = createAsyncThunk(
  "commentOnPost",
  async (data, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await commentOnPostByApi(data);
      // navigate("/profile");
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);
export const likeAComment = createAsyncThunk(
  "likeAComment",
  async (commentId, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await likeACommentByApi(commentId);
      // navigate("/profile");
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const getAllCommentsByPost = createAsyncThunk(
  "getAllCommentsByPost",
  async (postId, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await getAllCommentsByPostByApi(postId);
      // navigate("/profile");
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        const postData = action.payload.data;
        state.postData = postData;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        const postData = action.payload.data;
        state.postData.push(postData);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(liketPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(liketPost.fulfilled, (state, action) => {
        state.loading = false;
        const postData: PostState = action.payload.data;
        const updatedPostIdx = state.postData.findIndex(
          (post) => post.id === postData.id
        );
        state.postData[updatedPostIdx] = postData;
      })
      .addCase(liketPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(savePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.loading = false;
        const postData: PostState = action.payload.data;
        const updatedPostIdx = state.postData.findIndex(
          (post) => post.id === postData.id
        );
        state.postData[updatedPostIdx] = postData;
      })
      .addCase(savePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(commentOnPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(commentOnPost.fulfilled, (state, action) => {
        state.loading = false;
        const commentData: CommentState = action.payload.data;
        const updatedPostIdx = state.postData.findIndex(
          (post) => post.id === commentData?.post?.id
        );
        state.postData[updatedPostIdx].comments.push(commentData);
      })
      .addCase(commentOnPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(likeAComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeAComment.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCommentData: CommentState = action.payload.data;
        const updatedPostIdx = state.postData.findIndex(
          (post) => post.id === updatedCommentData?.post?.id
        );
        const updatedCommentIdx = state.postData[
          updatedPostIdx
        ]?.comments?.findIndex((cmnt) => cmnt.id === updatedCommentData?.id);

        state.postData[updatedPostIdx].comments[updatedCommentIdx] =
          updatedCommentData;
      })
      .addCase(likeAComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllCommentsByPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCommentsByPost.fulfilled, (state, action) => {
        state.loading = false;
        const commentData: CommentState[] = action.payload.data;
        const updatedPostIdx = state.postData.findIndex(
          (post) => post.id === commentData?.[0]?.post?.id
        );
        state.postData[updatedPostIdx].comments = commentData;
      })
      .addCase(getAllCommentsByPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const {} = postSlice.actions;

export default postSlice;
