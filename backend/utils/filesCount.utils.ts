import fs from "fs";
import path from "path";

export default function countFilesInDirSync(
  dirPath: string
): number | { status: string; error: string } {
  try {
    const files = fs.readdirSync(dirPath);

    const fileCount = files.filter((name) => {
      return fs.statSync(path.join(dirPath, name)).isFile();
    }).length;

    return fileCount;
  } catch (err) {
    console.error("Erreur lors du comptage des fichiers :", err);
    return { status: "error", error: "Une erreur est survenue" };
  }
}
