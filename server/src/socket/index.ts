import { Server, Socket } from "socket.io";
import { SessionSocket } from "../lib/socket-io";
import { logger } from "../logger";
import sampleHandler from "./handlers/sampleHandler";

export function onConnection(io: Server, defaultSocket: Socket) {
  const socket = defaultSocket as SessionSocket;
  const req = socket.request;
  const userId = req.session.userId;

  logger.info(`[SOCKET] User connected: ${socket.id}`);

  sampleHandler(io, socket);

  socket.on("disconnect", async () => {
    try {
      logger.info(
        `[SOCKET] User disconnected: [socket] ${socket.id}, [user] ${userId}`,
      );
    } catch (error) {
      logger.error(`Error on socket disconnect: ${error}`);
    }
  });
}
