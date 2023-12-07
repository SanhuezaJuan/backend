import nodemailer from "nodemailer";
import { config } from "dotenv";

config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.EMAIL_TEST,
    pass: process.env.PASS_EMAIL,
  },
});

const createSendEmail = async (addressee, token) => {
  try {
    if (!addressee || !token) throw new Error("Campos requeridos");
    let mailopts = {
      from: process.env.EMAIL_TEST,
      to: addressee,
      subject: "Correo de confirmacion",
      html: `
      <h2>Este es el correo de confirmacion de cuenta</h2>
      <p>Este link tiene una duracion de 1 hora desde la llegada de este correo</p>
  <br>
      <a href="http://localhost:8080/api/v1/confirm/?token=${token}">Confirmar correo</a> 
  `,
    };

    const sendEmail = async () => transporter.sendMail(mailopts);

    return sendEmail;
  } catch (err) {
    throw err;
  }
};

export { createSendEmail };
