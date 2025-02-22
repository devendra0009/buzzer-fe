import { CommentState } from "../comment/commentInterface";
import { UserState } from "../user/userInterfaces";

export interface PostState {
  id: number;
  caption: string;
  mediaFiles: string[];
  comments: CommentState[];
  user: UserState;
  tags: string[];
  location: string;
  likedBy: UserState[];
  savedBy: UserState[];
  userTagged: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PostWrapperState {
  postData: PostState[];
  loading: boolean;
  error: string | null;
}

export interface CreatePostCompProps {
  type: "POST" | "REEL";
}
