"use client";

import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

export function useSocket() {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:3001', {
        transports: ['websocket', 'polling'],
        path: '/socket.io/',
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        forceNew: true,
        timeout: 10000,
      });

      socketRef.current.on('connect', () => {
        console.log('Connected to Socket.IO server');
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('Socket connection error:', error.message);
        // Try to reconnect with polling if websocket fails
        if (socketRef.current.io.opts.transports[0] === 'websocket') {
          console.log('Falling back to polling transport');
          socketRef.current.io.opts.transports = ['polling'];
        }
      });

      socketRef.current.on("disconnect", (reason) => {
        console.log("Disconnected from Socket.IO server:", reason);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return socketRef.current;
} 