import { UserState } from "../user/userInterfaces";

export interface StoryRequest {
  captions: string;
  image: string;
  deactivatedAt: number;
}

export interface StoryState {
  id: number; // Corresponds to Long in Java
  captions: string;
  image: string;
  isActive: boolean;
  user: UserState; // Assuming `UserModel` is another interface or type
  seenBy: UserState[];
  deactivatedAt: Date; // Corresponds to LocalDateTime in Java
  createdAt: Date; // Corresponds to LocalDateTime in Java
  updatedAt: Date; // Corresponds to LocalDateTime in Java
}

export interface StoryWrapperState {
  stories: StoryState[];
  loading: boolean;
  error: string | null;
}
