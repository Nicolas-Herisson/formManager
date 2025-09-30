import { Request, Response } from "express";
import User from "../models/user.model";
import argon2 from "argon2";
import { emailSchema } from "../schemas/email.schema";
import { passwordSchema } from "../schemas/password.schema";
import jwt from "jsonwebtoken";
import { sendForgotPassword } from "../services/nodemailer.service";
import { v4 as uuidv4 } from "uuid";
import Invite from "../models/invite.model";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ where: { email } });

    if (!findUser) {
      return res
        .status(400)
        .json({ status: "error", error: "Email ou mot de passe incorrect" });
    }

    const passwordMatch = await argon2.verify(
      findUser.dataValues.password,
      password
    );

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ status: "error", error: "Email ou mot de passe incorrect" });
    }

    const accessToken = jwt.sign(
      { id: findUser.dataValues.id, role_id: findUser.dataValues.role_id },
      process.env.SALT!,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { id: findUser.dataValues.id },
      process.env.SALT!,
      { expiresIn: "1d" }
    );
    const csrfToken = uuidv4();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("csrfToken", csrfToken, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: "success",
      message: "Vous avez été connecté avec succès",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
}

export async function register(req: Request, res: Response) {
  const { name, email, password, confirmPassword, role } = req.body;

  const role_id = role === "admin" ? 1 : 2;

  if (password !== confirmPassword)
    return res.status(400).json({
      status: "error",
      error: "Les mots de passe ne correspondent pas",
    });

  const emailValidation = emailSchema.safeParse(email);
  const passwordValidation = passwordSchema.safeParse(password);

  if (!passwordValidation.success) {
    const messages = passwordValidation.error?.issues?.map(
      (issue: any) => issue.message
    );
    return res.status(400).json({ status: "error", error: messages });
  }

  if (!emailValidation.success) {
    const messages = emailValidation.error?.issues?.map(
      (issue: any) => issue.message
    );
    return res.status(400).json({ status: "error", error: messages });
  }

  try {
    const findUser = await User.findOne({ where: { email } });

    if (findUser) {
      return res
        .status(400)
        .json({ status: "error", error: "Cet email est déjà utilisé" });
    }

    const hashPassword = await argon2.hash(password);

    await User.create({
      name,
      email,
      password: hashPassword,
      role_id: role_id,
    });

    return res
      .status(201)
      .json({ status: "success", message: "Utilisateur créé avec succès" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
}

export function logout(req: Request, res: Response) {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("csrfToken");
  return res.status(200).json({
    status: "success",
    message: "Vous avez été déconnecté avec succès",
  });
}

export function refresh(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ status: "error", error: "Vous devez vous connecter" });
  }

  const decoded = jwt.verify(refreshToken, process.env.SALT!);

  if (typeof decoded === "string") {
    return res
      .status(401)
      .json({ status: "error", error: "Vous devez vous connecter" });
  }

  const accessToken = jwt.sign(
    { id: decoded.id, role_id: decoded.role_id },
    process.env.SALT!,
    {
      expiresIn: "1h",
    }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    status: "success",
    message: "Votre token a été actualisé avec succès",
  });
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;

  try {
    const findUser = await User.findOne({ where: { email } });

    if (!findUser) {
      return res
        .status(200)
        .json({ status: "error", error: "Un email vous a été envoyé" });
    }

    const response = await sendForgotPassword(
      findUser.dataValues.id,
      findUser.dataValues.email
    );

    // status 200 avoid user to know if the email is valid or not
    if (response.status === "error") {
      return res.status(200).json({ status: "error", error: response.error });
    }

    return res.status(200).json({
      status: "success",
      message: "Un email vous a été envoyé",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", error: "Une erreur est survenue" });
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { id, password, confirmPassword } = req.body;
    const isInvite = req.params.isInvite;

    if (!id || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ status: "error", error: "Tous les champs sont requis" });
    }

    if (isInvite === "1") {
      const deletedInvite = await Invite.destroy({
        where: { receiver_id: id },
      });

      if (!deletedInvite) {
        return res
          .status(404)
          .json({ status: "error", error: "Aucune invitation trouvée" });
      }
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
