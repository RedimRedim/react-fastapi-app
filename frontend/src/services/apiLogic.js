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

export const getFiles = async () => {
  try {
    const response = await api.get(`/api/files`);

    if (!response.statusCode === 2000) {
      throw new Error("Failed to fetch files");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching files: ", error);
    throw error;
  }
};

export const updateFile = async (file) => {
  try {
    const response = await api.put(
      `/api/files/`,
      {
        filename: file,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.statusCode === 200) {
      throw new Error("Failed to update file");
    }

    return response;
  } catch (error) {
    console.error("Error uploading files: ", error);
    throw error;
  }
};
