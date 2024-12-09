from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from services.logic import ApiLogicInstance
import os
import logging
from pydantic import BaseModel

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)


class FileUpdateRequest(BaseModel):
    filename: str


origins = ["http://localhost:8080", "http://localhost:5173"]

# Add CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # allow all methods
    allow_headers=["*"],  # allow all headers
)


@app.get("/")
def testing():
    return {"message": "Hello, World!"}


@app.get("/api/files")
async def get_files():
    details = ApiLogicInstance.get_filenames_details()
    return details


@app.post("/api/download/")
async def download_file(request: Request):
    data = await request.json()
    filename = data.get("filename")

    if not filename:
        raise HTTPException(status_code=400, detail="Filename is required")

    file_path = os.path.join("../api/data", filename + ".csv")
    logging.info(f"Requested file path: {file_path}")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail=f"File not found {file_path}")

    return FileResponse(file_path, status_code=200, filename=filename)


@app.put("/api/files/")
async def update_file(
    request: FileUpdateRequest,
):
    filename = request.filename

    logging.info(f"Updating file {filename}")
    try:
        ApiLogicInstance.update_file(filename)
        return {"message": f"File {filename} updated successfully"}
    except Exception as e:
        logging.error(f"Error updating file: {e}")
        raise HTTPException(status_code=500, detail=f"Error updating file: {e}")
