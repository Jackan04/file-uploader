import { Router } from "express";
import filesController from "../controllers/filesController.js";
import upload from "../middleware/upload.js";
import { requireAuth } from "../middleware/authentication.js";
import {
  fileUploadValidation,
  fileUpdateValidation,
} from "../middleware/validation.js";

const filesRouter = Router();

filesRouter.get("/upload", requireAuth, filesController.files_upload_get);
filesRouter.post(
  "/upload",
  requireAuth,
  upload.single("file"),
  fileUploadValidation,
  filesController.files_upload_post,
);

filesRouter.get(
  "/download/:id",
  requireAuth,
  filesController.files_download_get,
);

filesRouter.get("/update/:id", requireAuth, filesController.files_update_get);
filesRouter.post(
  "/update/:id",
  requireAuth,
  fileUpdateValidation,
  filesController.files_update_post,
);

filesRouter.post("/delete/:id", requireAuth, filesController.files_delete_post);

export default filesRouter;
