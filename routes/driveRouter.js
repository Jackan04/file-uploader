import { Router } from "express";
import driveController from "../controllers/driveController.js";
import filesRouter from "./filesRouter.js";
import foldersRouter from "./foldersRouter.js";
import { requireAuth } from "../middleware/authentication.js";

const driveRouter = Router();

// Index
driveRouter.get("/", requireAuth, driveController.drive_get);

driveRouter.use("/files", requireAuth, filesRouter);
driveRouter.use("/folders", requireAuth, foldersRouter);

export default driveRouter;
