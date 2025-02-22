import { GenderEnum } from "../auth/authInterfaces";
import { PostState } from "../post/postInterface";
import { ReelState } from "../reel/reelInterface";
import { StoryState } from "../story/storyInterfaces";

export interface UserState {
  id: number;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  gender: GenderEnum | null;
  profileImg: string;
  phone: number;
  followers: number[];
  followings: number[];
  posts: PostState[];
  reels: ReelState[];
  savedPost: PostState[];
  stories: StoryState[];
}

export interface UserWrapperState {
  userData: UserState;
  loading: boolean;
  error: string | null;
}

// export interface UserSearchCompProps {}
