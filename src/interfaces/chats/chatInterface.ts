import { MessageState } from "../messages/messageInterface";
import { UserState } from "../user/userInterfaces";

export interface ChatState {
  id: number;
  chatName: string;
  image: string;
  users: UserState[];
  messages: MessageState[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatWrapper {
  allChats: ChatState[];
  selectedChat: ChatState;
  loading: boolean;
  error: string | null;
}
