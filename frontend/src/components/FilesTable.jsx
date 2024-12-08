import { downloadFile } from "../services/apiLogic";

function FilesTable() {
  const handleDownloadBtnClick = async (filename, event) => {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation(); // Stop event bubbling
    console.log("Button clicked for file:", filename);

    try {
      await downloadFile(filename);
    } catch (error) {
      console.error("Error downloading files: ", error);
    }
  };

  return (
    <table
      className="table table-hover table-striped text-center align-middle"
      id="filesTable"
    >
      <thead>
        <tr>
          <th scope="col">File Name</th>
          <th scope="col">Updated At</th>
          <th scope="col">Size</th>
          <th scope="col">Download Button</th>
        </tr>
      </thead>
      <tbody id="fileTableBody">
        {/* Populate table with file data */}
        <tr>
          <td>Tokyo</td>
          <td>2024-10-10 19:00:00</td>
          <td>15kb</td>
          <td>
            <button
              onClick={(event) => handleDownloadBtnClick("tokyo", event)}
              type="button"
              className="btn btn-primary"
            >
              Download
            </button>
          </td>
        </tr>
        <tr>
          <td>Shinkansen</td>
          <td>2024-10-10 19:00:00</td>
          <td>15kb</td>
          <td>
            <button
              onClick={(event) => handleDownloadBtnClick("shinkansen", event)}
              type="button"
              className="btn btn-primary"
            >
              Download
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default FilesTable;
