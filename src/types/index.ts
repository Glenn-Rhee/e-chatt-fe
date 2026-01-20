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
  isFriend: false;
  isPending: false;
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
