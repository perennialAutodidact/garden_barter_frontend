import { User } from "./auth";

export interface Message {
    uuid: string;
    conversation: string;
    body: string;
    dateReceived: string;
    sender: Partial<User>;
    recipient: Partial<User>;
}

export interface Conversation {
    uuid: string;
    messages: Message[];
    barterUuid: string;
    barterType: "seed" | "plant" | "produce" | "material" | "tool";
    sender: Partial<User>;
    recipient: Partial<User>;
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
