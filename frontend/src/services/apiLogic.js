import api from "../api";

export const downloadFile = async (filename) => {
  try {
    const response = await api.post(
      `/api/download`,
      {
        filename: filename,
      },
      { headers: { "Content-Type": "application/json" } },
      {
        responseType: "blob", // Important for handling binary data
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "text/csv" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("target", "_blank");
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error fetching files: ", error);
    throw error;
  }
};
