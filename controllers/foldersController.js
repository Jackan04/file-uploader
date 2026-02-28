import { prisma } from "../lib/prisma.js";
import { validationResult } from "express-validator";
import { formatResources } from "../middleware/helpers.js";

async function folders_details_get(req, res, next) {
  try {
    const folderId = Number(req.params.id);

    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId: req.user.id,
      },
    });

    const files = await prisma.file.findMany({
      where: {
        folderId: folderId,
        userId: req.user.id,
      },
    });

    const formattedResources = formatResources({ files });

    res.render("drive/folder-details", {
      title: folder.name,
      files: formattedResources.files,
    });
  } catch (error) {
    next(error);
  }
}

async function folders_create_get(req, res, next) {
  try {
    res.render("drive/create-folder-form", {
      title: "Create Folder",
      validationErrors: [],
    });
  } catch (error) {
    next(error);
  }
}

async function folders_create_post(req, res, next) {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).render("drive/create-folder-form", {
        validationErrors: validationErrors.array(),
        title: "Create Folder",
      });
    }

    const { name } = req.body;
    const userId = req.user.id;

    await prisma.folder.create({
      data: {
        name: name,
        userId: userId,
      },
    });

    res.redirect("/drive");
  } catch (error) {
    next(error);
  }
}

async function folders_update_get(req, res, next) {
  try {
    const folder = await prisma.folder.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
    });

    res.render("drive/update-folder-form", {
      title: "Edit Folder",
      folder: folder,
      validationErrors: [],
    });
  } catch (error) {
    next(error);
  }
}

async function folders_update_post(req, res, next) {
  try {
    const folderId = Number(req.params.id);
    const { name } = req.body;

    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId: req.user.id,
      },
    });

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).render("drive/update-folder-form", {
        title: "Update Folder",
        folder: folder,
        validationErrors: validationErrors.array(),
      });
    }

    await prisma.folder.update({
      where: {
        id: folderId,
        userId: req.user.id,
      },
      data: {
        name: name,
      },
    });

    res.redirect("/drive");
  } catch (error) {
    next(error);
  }
}

async function folders_delete_post(req, res, next) {
  try {
    const folderId = Number(req.params.id);

    await prisma.folder.delete({
      where: {
        id: folderId,
        userId: req.user.id,
      },
    });

    res.redirect("/drive");
  } catch (error) {
    next(error);
  }
}

export default {
  folders_create_get,
  folders_create_post,
  folders_delete_post,
  folders_update_get,
  folders_update_post,
  folders_details_get,
};
