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

export interface DataFindFriend {
  id: string;
  email: string;
  isFriend: boolean;
  isPending: boolean;
  userDetail: {
    image_url: string;
  };
  username: string;
}

export interface DataNotifications {
  id: string;
  requester: {
    id: string;
    username: string;
    email: string;
    userDetail: {
      image_url: string | null;
    } | null;
  };
}

export type FriendStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "BLOCKED";

export interface FriendshipUser {
  friendshipId: string;
  friend: {
    id: string;
    email: string;
    username: string;
    userDetail: {
      image_url: string | null;
    } | null;
  };
}
