export interface ResponsePayload<T = unknown> {
  code: number;
  status: "success" | "failed";
  message: string;
  data: T;
}

export interface DataUser {
  email: string;
  username: string;
  userDetail: {
    birthday: Date | null;
    gender: "MALE" | "FEMALE" | "UNKNOWN";
    image_url: string;
  };
}

export interface DataFindFriend extends User {
  isFriend: boolean;
  isPending: boolean;
}

export interface DataNotifications {
  id: string;
  requester: User;
}

export type FriendStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "BLOCKED";

export type User = {
  id: string;
  username: string;
  email: string;
  userDetail: {
    image_url: string | null;
  } | null;
};

export interface FriendshipUser {
  friendshipId: string;
  friend: User;
}

export interface DataConversation {
  convId: string;
  userFrom: User;
  message: Message;
  totalUnread: number;
}

export type Message = {
  id: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  senderId: string;
};

export interface Conversation {
  id: string;
  messages: Message[];
}
