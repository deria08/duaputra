import { cloudinaryConfig, cld } from "@/backend/config/cloudinary";
import streamifier from "streamifier";

cloudinaryConfig();

export const POST = async (req) => {
  try {
    const contentType = req.headers.get("content-type");
    if (!contentType?.startsWith("multipart/form-data")) {
      return new Response(JSON.stringify({ error: "Content-Type must be multipart/form-data" }), { status: 400 });
    }

    // Ambil file dari request
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload ke Cloudinary
    const streamUpload = (fileBuffer) =>
      new Promise((resolve, reject) => {
        const stream = cld.uploader.upload_stream(
          { folder: "myapp_uploads" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });

    const result = await streamUpload(buffer);

    return new Response(JSON.stringify({ url: result.secure_url }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Upload gagal", detail: err.message }), { status: 500 });
  }
};
