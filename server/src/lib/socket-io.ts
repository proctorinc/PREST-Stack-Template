import { Server, Socket } from "socket.io";
import { SessionData } from "express-session";
import { IncomingMessage } from "http";
import session from "./express-session";
import { requireSocketAuth } from "../middleware";
import { onConnection } from "../socket";
import {
  SOCKET_PING_INTERVAL,
  SOCKET_PING_TIMEOUT,
  corsOptions,
} from "../config";
import http from "http";

// Define socket session data
interface SessionIncomingMessage extends IncomingMessage {
  session: SessionData;
}

// Define socket request with session
export interface SessionSocket extends Socket {
  request: SessionIncomingMessage;
}

// Express middleware wrapper for socket
const wrapper = (middleware: any) => (socket: Socket, next: any) =>
  middleware(socket.request, {}, next);

// Configure Socket io server
export const socketIO = (server: http.Server) => {
  const io = new Server(server, {
    cors: corsOptions,
    pingTimeout: SOCKET_PING_TIMEOUT,
    pingInterval: SOCKET_PING_INTERVAL,
  });

  // Setup socket middleware
  io.use(wrapper(session));
  io.use(wrapper(requireSocketAuth));

  // Run on socket connection
  io.on("connection", (socket: Socket) => onConnection(io, socket));

  return io;
};

export { Socket } from "socket.io";
