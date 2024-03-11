// Host
export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const PORT = process.env.PORT ?? 3000;
export const HOST = process.env.API_URL ?? "http://localhost:5173";

// Environment
export const DEVELOPMENT = "development";
export const PRODUCTION = "production";
export const isDevelopment = NODE_ENV === DEVELOPMENT;

// Session
export const SESSION_SECRET = process.env.SESSION_SECRET ?? "secret";
export const SESSION_EXPIRATION = 1000 * 60 * 60 * 172800;
export const SECURE_COOKIE = NODE_ENV === "development" ? false : true;

// Logger
export const LOG_LEVEL = process.env.LOG_LEVEL ?? "info";

// Socket IO
export const SOCKET_PING_TIMEOUT = 60000;
export const SOCKET_PING_INTERVAL = 5000;

// Cors
export const corsOptions = {
  origin: [HOST],
  credentials: true,
};
