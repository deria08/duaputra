import connectDB from "@/backend/config/db";
import Contact from "@/backend/models/contact";
import nodemailer from "nodemailer";

connectDB();

const DEFAULT_RECEIVER = "nanangces@gmail.com";

export async function POST(req) {
  try {
    const body = await req.json();
    const { nama, email, subjek, pesan, tujuanEmail } = body;

    // simpan ke DB
    const newContact = new Contact({ nama, email, subjek, pesan });
    await newContact.save();

    // setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // email tujuan
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

    return new Response(JSON.stringify({ message: "Pesan berhasil dikirim dan disimpan." }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Terjadi kesalahan.", error }), { status: 500 });
  }
}
