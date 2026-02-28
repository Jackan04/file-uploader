import { prisma } from "../lib/prisma.js";
import { formatResources } from "../middleware/helpers.js";

async function drive_get(req, res, next) {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId: req.user.id,
      },
    });

    const files = await prisma.file.findMany({
      where: {
        folderId: null,
        userId: req.user.id,
      },
    });

    const allResources = formatResources({ folders, files });

    res.render("drive/drive", {
      title: "My Drive",
      folders: allResources.folders,
      files: allResources.files,
      allResources: [...allResources.folders, ...allResources.files],
    });
  } catch (error) {
    next(error);
  }
}

export default { drive_get };
