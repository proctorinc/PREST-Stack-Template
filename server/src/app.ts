import express, { Request, Response, NextFunction } from "express";
import http from "http";
import cors from "cors";
import { db } from "./db";
import errorHandler from "errorhandler";
import { socketIO } from "./lib/socket-io";
import session from "./lib/express-session";
import { PORT, corsOptions } from "./config";
import morgan from "./lib/morgan";
import { logger } from "./logger";
import routes from "./routes";

const app = express();
const server = http.createServer(app);

app.set("db", db);
app.set("socketio", socketIO(server));
app.use(express.json());
app.use(cors(corsOptions));
app.use(session);
app.use(errorHandler());
app.use(morgan);
app.use(routes);

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "API is running on /api" });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(`Internal Server Error: ${error}`);
  return res.status(500).json({ error: "Internal Server Error" });
});

server.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
