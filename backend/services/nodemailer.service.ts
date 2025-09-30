import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: Number(process.env.NODEMAILER_PORT),
  secure: Boolean(process.env.NODEMAILER_SECURE === "true"),
  auth: {
    user: process.env.NODEMAILER_SENDER_MAIL,
    pass: process.env.NODEMAILER_SENDER_PASSWORD,
  },
});

export const sendInvite = async (id: string, email: string, role: string) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_SENDER_MAIL,
      to: email,
      subject: "Invitation à rejoindre Form Manager",
      html: `
      <p>Vous avez été invité à rejoindre Form Manager en tant que ${role}, </p>
      <p>cliquez sur le lien suivant pour initialiser votre mot de passe : </p>
      <a href="http://localhost:5173/1/reset-password/${id}">cliquez ici</a>
      <p>Si vous n'avez pas été invité, ignorez ce message.</p>
      <p>Cordialement, </p>
      <p>Form Manager</p>`,
    };

    await transporter.sendMail(mailOptions);

    return { status: "success", message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { status: "error", error: "Error sending email" };
  }
};

export const sendForgotPassword = async (id: string, email: string) => {
  try {
    const mailOptions = {
      from: process.env.NODEMAILER_SENDER_MAIL,
      to: email,
      subject: "Mot de passe oublié",
      html: `
      <p>Vous avez demandé à réinitialiser votre mot de passe, </p>
      <p>cliquez sur le lien suivant pour réinitialiser votre mot de passe : </p>
      <a href="http://localhost:5173/0/reset-password/${id}">cliquez ici</a>
      <p>Si vous n'avez pas demandé à réinitialiser votre mot de passe, ignorez ce message.</p>
      <p>Cordialement, </p>
      <p>Form Manager</p>`,
    };

    await transporter.sendMail(mailOptions);

    return { status: "success", message: "Un email vous a été envoyé" };
  } catch (error) {
    return { status: "error", error: "Error sending email" };
  }
};

export default transporter;
