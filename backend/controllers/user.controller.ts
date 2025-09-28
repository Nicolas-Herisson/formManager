import { Request, Response } from "express";
import User from "../models/user.model";
import Role from "../models/role.model";
import { sendInvite } from "../services/nodemailer.service";
import { IUserWithRole } from "../@types/user";
import argon2 from "argon2";

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

export async function inviteUser(req: Request, res: Response) {
  try {
    const { email, name, role_id } = req.body;

    if (!email || !name || !role_id) {
      return res
        .status(400)
        .json({ status: "error", error: "Tous les champs sont requis" });
    }

    const findUser = await User.findOne({ where: { email } });

    if (findUser) {
      return res
        .status(400)
        .json({ status: "error", error: "Cet email est deja utilisé" });
    }

    await User.create({
      email,
      name,
      role_id,
    });

    // nested + raw to get role and user in one query with direct access to role
    const user = (await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          as: "role",
          required: true,
        },
      ],
      nest: true,
      raw: false,
    }).then((user) => user?.get({ plain: true }))) as unknown as IUserWithRole;

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", error: "Utilisateur non trouvé" });
    }

    const response = await sendInvite(user.id, user.email, user.role.name);

    if (response.status === "error") {
      return res.status(500).json({ status: "error", error: response.error });
    }
    return res.status(201).json({
      status: "success",
      message: "Invitation envoyée avec succès",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", error: "Une erreur est survenue" });
  }
}

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

export async function resetPassword(req: Request, res: Response) {
  try {
    const { id, password, confirmPassword } = req.body;

    if (!id || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ status: "error", error: "Tous les champs sont requis" });
    }

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", error: "Utilisateur non trouvé" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "error",
        error: "Les mots de passe ne correspondent pas",
      });
    }

    const hashedPassword = await argon2.hash(password);

    await User.update({ password: hashedPassword }, { where: { id } });

    return res.status(200).json({
      status: "success",
      message: "Mot de passe réinitialisé avec succès",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", error: "Une erreur est survenue" });
  }
}
