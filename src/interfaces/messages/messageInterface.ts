import { UserState } from "../user/userInterfaces";

export interface MessageState {
  id: number;
  content: string;
  image: string;
  user: UserState;
  createdAt: string;
  updatedAt: string;
}

export interface MessageStateWrapper {
  messages: MessageState[];
  loading: boolean;
  error: string|null;
}
