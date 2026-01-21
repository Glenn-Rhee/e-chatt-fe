import { io, Socket } from "socket.io-client";
let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    auth: {
      token,
    },
    transports: ["websocket"],
  });

  return socket;
};

export const getSocket = () => socket;
