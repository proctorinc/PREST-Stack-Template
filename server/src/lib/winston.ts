import winston from "winston";
import { LOG_LEVEL } from "../config";

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

export default winston.createLogger({
  level: LOG_LEVEL,
  format,
  transports: [new winston.transports.Console()],
});
