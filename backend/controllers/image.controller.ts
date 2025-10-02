import { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs, { existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function uploadImage(req: Request, res: Response) {
  try {
    const { formTitle, questionTitle } = req.body;

    if (!formTitle || !questionTitle) {
      return res.status(400).json({
        status: "error",
        error: "Titre du formulaire et titre de la question sont obligatoires",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: "error",
        error: "Aucun fichier n'a été téléchargé",
      });
    }

    const relativePath = `/images/uploads/${formTitle}/${questionTitle}/${req.file.filename}`;

    return res.status(200).json({
      status: "success",
      message: "Image téléchargée avec succès",
      filePath: relativePath,
    });
  } catch (error) {
    console.error("Erreur inattendue:", error);
    return res.status(500).json({
      status: "error",
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }
}

export async function deleteImageAndDirectory(req: Request, res: Response) {
  try {
    const { formTitle, questionTitle } = req.body;

    if (!formTitle || !questionTitle) {
      return res.status(400).json({
        status: "error",
        error: "Titre du formulaire et titre de la question sont obligatoires",
      });
    }
    const dir = path.join(
      __dirname,
      `../public/images/uploads/${formTitle}/${questionTitle}`
    );

    if (!existsSync(dir)) {
      return res.status(404).json({
        status: "error",
        error: "Le dossier n'existe pas",
      });
    }

    const files = fs.readdirSync(dir);

    files.map((file) => fs.unlinkSync(path.join(dir, file)));
    fs.rmdirSync(dir);
    return res.status(200).json({
      status: "success",
      message: "Image supprimée avec succès",
    });
  } catch (error) {
    console.error("Erreur inattendue:", error);
    return res.status(500).json({
      status: "error",
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }
}
