import { NextFunction, Request, Response, Router } from "express";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import { CreateUserInput, UserRole } from "../types";
import { requireLogin } from "../middleware";
import { isDevelopment } from "../config";
import { logger } from "../logger";

const router = Router();

router.post(
  "/auth/token",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    try {
      let user = await userService.findByEmail(email);
      logger.info(`Auth token requested by ${email}`);

      if (user) {
        const authToken = await authService.createAuthToken(user.id);
        if (isDevelopment) {
          res.json({ otp: authToken.value });
        } else {
          // TODO: Send auth token to user
          logger.info(`Auth token sent to: ${email}`);

          res.json({ message: "Emailed auth token" });
        }
      } else {
        logger.warn(`Email is unregistered: ${email}`);

        res.json({ message: "Emailed auth token" });
      }
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/auth/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const createUserBody = req.body as CreateUserInput;

    try {
      // let user = await userService.create(createUserBody);
      // const authToken = await authService.createAuthToken(user.id);

      // res.json({ otp: authToken.value });
      res
        .status(501)
        .json({ message: "/auth/register is not implemented yet" });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/auth/guest",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user = await userService.createGuest();

      authService.createUserSession(req, user.id);
      logger.info(`Guest login: ${user.id}`);

      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/auth/token/validate",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, token } = req.body;

    try {
      const user = await userService.findByEmail(email);
      const validToken = user
        ? await authService.validateAuthToken(user?.id, token)
        : false;

      if (user && validToken) {
        await authService.invalidateAuthToken(user.id, token);

        authService.createUserSession(req, user.id);
        logger.info(`Successfull login: ${user.id}`);

        res.json(user);
      } else {
        logger.warn(`Failed login: ${email}, ${token}`);
        res.status(403).json({ error: "Invalid token or email" });
      }
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/auth/logout",
  requireLogin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.session.userId as string;
      const user = await userService.findById(userId);
      const userRole = user!.role as UserRole;

      req.session.destroy(function () {
        logger.info(`User session successfully destroyed: ${user!.id}`);
      });

      // Delete Guest users on logout
      if (userRole === UserRole.Guest) {
        userService.deleteById(userId);
      }

      logger.info(`Successfully logged out: ${user!.id}`);
      res.json({ message: "Successfully logged out" });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
