import session from "express-session";
import { SECURE_COOKIE, SESSION_EXPIRATION, SESSION_SECRET } from "../config";

// Augment express-session with a custom SessionData object
declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

// Configure user session
export default session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: SECURE_COOKIE,
    maxAge: SESSION_EXPIRATION,
  },
});
