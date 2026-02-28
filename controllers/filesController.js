import { prisma } from "../lib/prisma.js";
import { validationResult } from "express-validator";
import { formatBytes } from "../middleware/helpers.js";

async function files_upload_get(req, res, next) {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId: req.user.id,
      },
    });

    res.render("drive/upload-file-form", {
      title: "Upload File",
      folders: folders,
      validationErrors: [],
    });
  } catch (error) {
    next(error);
  }
}

async function files_upload_post(req, res, next) {
  try {
    const file = req.file;
    const { folderId } = req.body;

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const folders = await prisma.folder.findMany({
        where: {
          userId: req.user.id,
        },
      });
      return res.status(400).render("drive/upload-file-form", {
        title: "Upload File",
        folders: folders,
        validationErrors: validationErrors.array(),
      });
    }

    await prisma.file.create({
      data: {
        name: file.originalname,
        content: file.buffer,
        mimeType: file.mimetype,
        size: file.size,
        userId: req.user.id,
        folderId: folderId ? Number(folderId) : null,
      },
    });

    res.redirect(folderId ? `/drive/folders/details/${folderId}` : "/drive");
  } catch (error) {
    next(error);
  }
}

async function files_download_get(req, res, next) {
  const fileId = Number(req.params.id);

  try {
    const file = await prisma.file.findFirst({
      where: {
        userId: req.user.id,
        id: fileId,
      },
    });

    res.setHeader("Content-Type", file.mimeType);
    res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);
    res.send(file.content);
  } catch (error) {
    next(error);
  }
}

async function files_update_get(req, res, next) {
  try {
    const fileId = Number(req.params.id);

    const folders = await prisma.folder.findMany({
      where: {
        userId: req.user.id,
      },
    });

    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        userId: req.user.id,
      },
    });

    res.render("drive/update-file-form", {
      title: "Update File",
      file: file,
      folders: folders,
      validationErrors: [],
    });
  } catch (error) {
    next(error);
  }
}

async function files_update_post(req, res, next) {
  try {
    const fileId = Number(req.params.id);
    const { name, folderId } = req.body;

    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        userId: req.user.id,
      },
    });

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const folders = await prisma.folder.findMany({
        where: {
          userId: req.user.id,
        },
      });
      return res.status(400).render("drive/update-file-form", {
        title: "Update File",
        file: file,
        folders: folders,
        validationErrors: validationErrors.array(),
      });
    }

    await prisma.file.update({
      where: {
        id: Number(fileId),
        userId: req.user.id,
      },
      data: {
        name: name,
        folderId: folderId ? Number(folderId) : null,
      },
    });

    res.redirect(folderId ? `/drive/folders/details/${folderId}` : "/drive");
  } catch (error) {
    next(error);
  }
}

async function files_delete_post(req, res, next) {
  try {
    const fileId = Number(req.params.id);
    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        userId: req.user.id,
      },
    });
    const folderId = file.folderId;

    await prisma.file.delete({
      where: {
        id: fileId,
        userId: req.user.id,
      },
    });

    res.redirect(folderId ? `/drive/folders/details/${folderId}` : "/drive");
  } catch (error) {
    next(error);
  }
}

export default {
  files_upload_get,
  files_upload_post,
  files_update_get,
  files_update_post,
  files_delete_post,
  files_download_get,
};
