import { Router } from "express";
import foldersController from "../controllers/foldersController.js";
import { folderValidation } from "../middleware/validation.js";

const foldersRouter = Router();

foldersRouter.get("/details/:id", foldersController.folders_details_get);

foldersRouter.get("/create", foldersController.folders_create_get);

foldersRouter.post(
  "/create",
  folderValidation,
  foldersController.folders_create_post,
);

foldersRouter.get("/update/:id", foldersController.folders_update_get);

foldersRouter.post(
  "/update/:id",
  folderValidation,
  foldersController.folders_update_post,
);

foldersRouter.post("/delete/:id", foldersController.folders_delete_post);

export default foldersRouter;
