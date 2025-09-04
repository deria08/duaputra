// controllers/contactController.js
import Contact from "../models/contact.js";
import nodemailer from "nodemailer";

// Ganti dengan email tujuan default
const DEFAULT_RECEIVER = "nanangces@gmail.com";

export const createContact = async (req, res) => {
  try {
    const { nama, email, subjek, pesan, tujuanEmail } = req.body;

    // simpan ke DB
    const newContact = new Contact({ nama, email, subjek, pesan });
    await newContact.save();

    // setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // bisa diganti (contoh: smtp.mailtrap.io untuk testing)
      auth: {
        user: process.env.EMAIL_USER, // email pengirim
        pass: process.env.EMAIL_PASS, // password / app password
      },
    });

    // email tujuan (default marketing@duaputra.co.id, bisa override)
    const to = tujuanEmail || DEFAULT_RECEIVER;

    // kirim email
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to,
      subject: subjek,
      text: `
Nama: ${nama}
Email: ${email}
Pesan:
${pesan}
      `,
    });

    res.status(201).json({ message: "Pesan berhasil dikirim dan disimpan." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan.", error });
  }
};
