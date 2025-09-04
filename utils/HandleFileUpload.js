// utils/handleFileUpload.js
export const handleFileUpload = async (e) => {
  if (!e.target.files || !e.target.files[0]) return null;

  const selectedFile = e.target.files[0];
  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload gagal");

    const data = await res.json();
    return data.url; // ✅ balikin URL aja
  } catch (err) {
    console.error("Upload gagal:", err);
    return null;
  }
};
