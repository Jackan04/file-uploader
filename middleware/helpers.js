import { format } from "date-fns";
import { capitalize } from "@jacobasker/helpers";

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function formatResources(resources) {
  const formattedResources = {};

  if (resources.files) {
    formattedResources.files = resources.files.map((file) => {
      return {
        ...file,
        size: formatBytes(file.size),
        createdAt: format(new Date(file.createdAt), "yyyy-MM-dd HH:mm"),
        resourceType: capitalize(file.mimeType),
      };
    });
  }

  if (resources.folders) {
    formattedResources.folders = resources.folders.map((folder) => {
      return {
        ...folder,
        createdAt: format(new Date(folder.createdAt), "yyyy-MM-dd HH:mm"),
        resourceType: "Folder",
      };
    });
  }

  return formattedResources;
}

export { formatResources, formatBytes };
