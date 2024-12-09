import React, { useState, useEffect } from "react";
import { downloadFile, getFiles, updateFile } from "../services/apiLogic";

function FilesTable() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fetchedFiles = await getFiles();
        setFiles(fetchedFiles);
      } catch (error) {
        setError(error);
      }
    };

    fetchFiles();
  }, []);

  const handleDownloadBtnClick = async (filename, event) => {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation(); // Stop event bubbling
    console.log("Button clicked for file:", filename);

    try {
      await downloadFile(filename);
      alert(`${filename} downloaded successfully`);
    } catch (error) {
      console.error("Error downloading files: ", error);
    }
  };

  const handleUpdateBtnClick = async (filename, event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Update Button clicked for file:", filename);

    try {
      const result = await updateFile(filename);
      alert(result.data.message);
      // Update the files list
      const updatedFiles = await getFiles();
      setFiles(updatedFiles);
    } catch (error) {
      console.error("Error updating files: ", error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <table
      className="table table-hover table-striped text-center align-middle"
      id="filesTable"
    >
      <thead>
        <tr>
          <th scope="col">File Name</th>
          <th scope="col">Updated At</th>
          <th scope="col">Download Button</th>
        </tr>
      </thead>
      <tbody id="fileTableBody">
        {files.map((file, index) => (
          <tr key={index}>
            <td>{file.fileName}</td>
            <td>{file.updatedAt}</td>
            <td>
              <button
                onClick={(event) => handleUpdateBtnClick(file.fileName, event)}
                type="button"
                className="btn btn-secondary"
              >
                Update
              </button>
              <button
                onClick={(event) =>
                  handleDownloadBtnClick(file.fileName, event)
                }
                type="button"
                className="btn btn-primary"
              >
                Download
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FilesTable;
