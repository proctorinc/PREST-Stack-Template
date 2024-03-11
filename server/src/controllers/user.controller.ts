import { NextFunction, Request, Response, Router } from "express";
import userService from "../services/user.service";
import { UpdateUserProfileInput } from "../types";
import { requireLogin, requireUser } from "../middleware";
import { logger } from "../logger";

const router = Router();

router.get(
  "/user/me",
  requireLogin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.session.userId as string;
      const user = await userService.findById(userId)!;

      logger.info(`User ping success: ${userId}`);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  "/user",
  requireUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.session.userId as string;
      const updateBody = req.body as UpdateUserProfileInput;

      const updatedUser = await userService.updateUserProfile(
        userId,
        updateBody,
      );
      logger.info(`User updated successfully: ${userId}`);
      res.json({ user: updatedUser });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
