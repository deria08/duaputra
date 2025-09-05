export const handleFileUpload = async (e) => {
  if (!e.target.files || !e.target.files[0]) return null;

  const selectedFile = e.target.files[0];
  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload gagal");

    const data = await res.json();
    console.log("Upload response:", data); // ✅ debug
    return data.url; // ✅ pakai `url` sesuai API
  } catch (err) {
    console.error("Upload gagal:", err);
    return null;
  }
};
