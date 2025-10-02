import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import countFilesInDirSync from "../utils/filesCount.utils";
import ensureDirectoryExists from "../utils/createDirectoryPath.utils";
import fs from "fs";
import { existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { formTitle, questionTitle } = req.body;
    const dir = path.join(
      __dirname,
      `../public/images/uploads/${formTitle}/${questionTitle}`
    );

    // delete files in dir if exists
    if (existsSync(dir)) {
      try {
        const files = fs.readdirSync(dir);
        files.map((file) => fs.unlinkSync(path.join(dir, file)));
      } catch (error) {
        console.error("Error deleting files:", error);
      }
    }

    ensureDirectoryExists(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const { formTitle, questionTitle } = req.body;
    const dir = path.join(
      __dirname,
      `../public/images/uploads/${formTitle}/${questionTitle}`
    );
    const filesCount = countFilesInDirSync(dir);
    if (typeof filesCount === "object") {
      return cb(new Error("Erreur lors du comptage des fichiers"), "");
    }
    const ext = path.extname(file.originalname);
    cb(null, `${filesCount}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Type de fichier non supporté. Seuls les JPEG, PNG et GIF sont autorisés."
        )
      );
    }
  },
}).single("image");

export default function uploadMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.body);
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        status: "error",
        error: err.message || "Erreur lors du téléchargement du fichier",
      });
    }
    next();
  });
}
