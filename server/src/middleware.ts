import { NextFunction, Request, Response } from "express";
import userService from "./services/user.service";
import { UserRole } from "./types";
import { logger } from "./logger";

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return requireAuth(
    req,
    res,
    next,
    [UserRole.Admin],
    "Admin authority Required",
  );
}

export async function requireUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return requireAuth(
    req,
    res,
    next,
    [UserRole.Admin, UserRole.User],
    "User authority Required",
  );
}

export async function requireLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return requireAuth(
    req,
    res,
    next,
    [UserRole.Admin, UserRole.User, UserRole.Guest],
    "Login Required",
  );
}

async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
  allowedRoles: UserRole[],
  requiredRoleText: string,
) {
  if (req.session && req.session.userId) {
    const user = await userService.findById(req.session.userId);
    const userRole = user!.role as UserRole;

    // Determine if user's role is in authorized role list
    if (user && allowedRoles.includes(userRole)) {
      // Set user for next function
      res.locals.user = user;
      next();
    } else {
      logger.warn(
        `Unauthorized access. User has role ${userRole}, but minimum role ${allowedRoles[0]} is required`,
      );
      res.status(403).json({
        message: `You are not authorized to access this endpoint. ${requiredRoleText}`,
      });
    }
  } else {
    logger.warn(`Unauthorized access. User is not authenticated`);
    res.status(403).json({
      message: `You are not authorized to access this endpoint. ${requiredRoleText}`,
    });
  }
}

export async function requireSocketAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  if (req.session && req.session.userId) {
    next();
  } else {
    logger.warn("[SOCKET] Unauthorized socket access");
  }
}
