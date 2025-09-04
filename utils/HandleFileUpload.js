// utils/handleFileUpload.js
export const handleFileUpload = async (e, setter, prevState) => {
  if (!e.target.files || !e.target.files[0]) return;

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

    // Update state sesuai entity (product/news/team)
    setter({ ...prevState, image: data.url });
  } catch (err) {
    console.error("Upload gagal:", err);
  }
};
