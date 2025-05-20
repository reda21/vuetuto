import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

interface useSocketReturn {
  socket: Socket;
  emit: (event: string, data: any) => void;
  on: (event: string, callback: (data: any) => void) => void;
}

export function useSocket(): useSocketReturn {
  if (!socket) {
    socket = io('http://localhost:3000', {
      transports: ['websocket'],
      autoConnect: true,
    });
  }

  const emit = (event: string, data: any) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  const on = (event: string, callback: (data: any) => void) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  return { socket, emit, on };
}
