import { Request, Response } from "express";
import User from "../models/user.model";
import Role from "../models/role.model";
import { sendInvite } from "../services/nodemailer.service";
import { IUserWithRole } from "../@types/user";
import Invite from "../models/invite.model";

export async function getInvites(req: Request, res: Response) {
  try {
    const invites = await Invite.findAll({
      include: [
        {
          model: User,
          as: "receiver",
          required: true,
          attributes: ["name", "email"],
        },
      ],
      nest: true,
      raw: false,
    });

    if (!invites) {
      return res
        .status(404)
        .json({ status: "error", error: "Aucune invitation trouvée" });
    }

    return res.status(200).json({
      status: "success",
      invites,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", error: "Une erreur est survenue" });
  }
}

export async function getInvite(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", error: "L'ID est requis" });
    }

    const invite = await Invite.findOne({ where: { id } });

    if (!invite) {
      return res
        .status(404)
        .json({ status: "error", error: "Aucune invitation trouvée" });
    }

    return res.status(200).json({
      status: "success",
      invite,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", error: "Une erreur est survenue" });
  }
}

export async function invite(req: Request, res: Response) {
  try {
    const { email, name, role_id } = req.body;

    if (!req.userId) {
      return res
        .status(401)
        .json({ status: "error", error: "Vous devez vous connecter" });
    }

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

    const invite = await Invite.create({
      sender_id: req.userId,
      receiver_id: user.id,
    });

    if (!invite) {
      return res.status(404).json({
        status: "error",
        error: "Erreur lors de la création de l'invitation",
      });
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

export async function deleteInvite(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: "error", error: "L'ID est requis" });
    }

    const deletedInvite = await Invite.destroy({ where: { id } });

    if (!deletedInvite) {
      return res
        .status(404)
        .json({ status: "error", error: "Aucune invitation trouvée" });
    }

    return res.status(200).json({
      status: "success",
      message: "Invitation supprimée avec succès",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", error: "Une erreur est survenue" });
  }
}
