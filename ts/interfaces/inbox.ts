import { User } from "./auth";

export interface Message {
  body: string;
  dateRecieved: string;
  sender: User;
  recipient: User;
  dateReceieved: string;
}

export interface Conversation {
  id: number;
  messages: Message[];
  barterId: number;
  barterType: "seed" | "plant" | "produce" | "material" | "tool";
  sender: User;
  recipient: User;
}

export interface InboxState {
  conversations: Conversation[];
  inboxLoadingStatus: "IDLE" | "PENDING";
  user: User;
  activeConversation: Conversation;
}

export interface MessageFormData {
  messageBody: string;
  barterType: string;
  barterId: string;
  senderId: number;
  recipientId: number;
}
