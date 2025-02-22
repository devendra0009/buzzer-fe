import { PostState } from "../post/postInterface";
import { UserState } from "../user/userInterfaces";

export interface CommentState {
  id: number;
  content: string;
  commentedBy: UserState;
  likedBy: UserState[];
  post: PostState;
  createdAt: string;
  updatedAt: string;
}
