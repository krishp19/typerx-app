"use client";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io('http://localhost:3001', {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      autoConnect: true,
      forceNew: true
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected successfully:", socketInstance.id);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    socketInstance.on("connect_timeout", () => {
      console.error("Socket connection timeout");
    });

    socketInstance.on("reconnect", (attemptNumber) => {
      console.log("Socket reconnected after", attemptNumber, "attempts");
    });

    socketInstance.on("reconnect_error", (err) => {
      console.error("Socket reconnection error:", err.message);
    });

    socketInstance.on("reconnect_failed", () => {
      console.error("Socket reconnection failed after max attempts");
      // Try to create a new connection after all reconnection attempts fail
      socketInstance.connect();
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        console.log("Cleaning up socket connection");
        socketInstance.removeAllListeners();
        socketInstance.disconnect();
      }
    };
  }, []);

  return socket;
} 