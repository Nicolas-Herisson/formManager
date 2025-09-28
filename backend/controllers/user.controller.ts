import { Request, Response } from "express";
import User from "../models/user.model";
import Role from "../models/role.model";

export async function createUser() {}

export async function getUsers() {}

export async function getUser() {}

export async function getMe(req: Request, res: Response) {
  const userId = req.userId;

  if (!userId)
    return res
      .status(401)
      .json({ status: "error", error: "Vous devez vous connecter" });

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", error: "Utilisateur non trouvé" });
    }

    return res.status(200).json({
      status: "success",
      id: user.dataValues.id,
      role_id: user.dataValues.role_id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", error: "Une erreur est survenue" });
  }
}

export async function updateUser() {}

export async function deleteUser() {}

export async function inviteUser(req: Request, res: Response) {}

export async function getRoles(req: Request, res: Response) {
  try {
    const roles = await Role.findAll();

    if (!roles) {
      return res
        .status(404)
        .json({ status: "error", error: "Rôles non trouvés" });
    }

    return res.status(200).json({
      status: "success",
      roles,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", error: "Une erreur est survenue" });
  }
}
