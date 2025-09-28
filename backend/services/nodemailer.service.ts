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
    console.log("in sendInvite");
    console.log("id:", id);
    console.log("email:", email);
    console.log("role:", role);
    const mailOptions = {
      from: process.env.NODEMAILER_SENDER_MAIL,
      to: email,
      subject: "Invitation à rejoindre Form Manager",
      html: `
      <p>Vous avez été invité à rejoindre Form Manager en tant que ${role}, </p>
      <p>cliquez sur le lien suivant pour initialiser votre mot de passe : </p>
      <a href="http://localhost:5173/reset-password/${id}">cliquez ici</a>
      <p>Si vous n'avez pas été invité, ignorez ce message.</p>
      <p>Cordialement, </p>
      <p>Form Manager</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);

    return { status: "success", message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { status: "error", error: "Error sending email" };
  }
};

export default transporter;
