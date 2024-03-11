import { Server } from "socket.io";
import userService from "../../services/user.service";
import { SessionSocket } from "../../lib/socket-io";
import { logger } from "../../logger";

export default async (_io: Server, socket: SessionSocket) => {
  const req = socket.request;
  const userId = req.session.userId;
  const currentUser = await userService.findById(userId);

  socket.on("whoami", async () => {
    logger.info(`[SOCKET] socket request 'whoami' success`);

    // Send current user
    socket.send("whoami", currentUser);
  });
};
