import { Router } from "express";
import authController from "./controllers/auth.controller";
import userController from "./controllers/user.controller";

const api = Router();
api.use(authController);
api.use(userController);

export default Router().use("/api", api);
