// models/contact.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true },
  subjek: { type: String, required: true },
  pesan: { type: String, required: true },
}, { timestamps: true });

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
