import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { connectSocket } from "../lib/socket";

export default function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.user.token) return;

    if (!socketRef.current) {
      socketRef.current = connectSocket(session.user.token);
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [session?.user.token]);

  return socketRef;
}
