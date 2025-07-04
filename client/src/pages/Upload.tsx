import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import authToken from "../tokens/authToken";
import starToken from "../tokens/starToken";
import { getUserFiles, uploadFile } from "../services/api/fileServices";

const Upload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generalError, setGeneralError] = useState("");

  let userId = "";

  try {
    const profile = authToken.getProfile();
    if (!profile) throw new Error("User Profile not found.");
    userId = profile.userId;
  } catch (error) {
    console.error("[Upload.tsx] Failed to fetch user's profile:", error);
    Swal.fire({
      title: "Whoops!",
      text: "An unknown error has occurred. Please try again later.",
      icon: "warning",
      background: "#09203f",
      color: "#fff",
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: "Return to Home",
    }).then(() => navigate("/"));
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      setGeneralError("No file selected.");
      return;
    }

    try {
      const files = await getUserFiles(userId);
      if (!files) throw new Error("No files found.");

      for (let i = 0; i < files.length; i++) {
        if (selectedFile.name.trim() === files[i].name) {
          setGeneralError("File name must be unique.");
          return;
        }
      }

      const uploadedFile = await uploadFile(selectedFile);

      Swal.fire({
        title: "File Uploaded!",
        text: "Check out your file on the storage page or view your constellation.",
        icon: "success",
        background: "#09203f",
        color: "#fff",
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: "Go to Storage",
        cancelButtonText: "View Art",
        cancelButtonColor: "#3ea381",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/storage");
        } else {
          if (result.dismiss === Swal.DismissReason.cancel) {
            starToken.generate();
            navigate("/constellation", { state: uploadedFile });
          } else {
            setSelectedFile(null);
            setGeneralError("");
          }
        }
      });
    } catch (error) {
      console.error("[Upload.tsx] Failed to upload file:", error);
      setGeneralError("An error has occurred. Please try again.");
      Swal.fire({
        title: "Whoops!",
        text: "An error has occurred. Please check if your file is valid and is under 50MB.",
        icon: "error",
        background: "#09203f",
        color: "#fff",
      });
    }
  };

  return (
    <div className="text-center h-screen">
      <h1 className="text-[whitesmoke] text-2xl mt-[200px] mb-[70px]">
        Upload Your Files
      </h1>
      <div className="flex flex-col justify-between items-center">
        <FontAwesomeIcon
          className="file-upload-icon text-[80px] text-[whitesmoke] drop-shadow-md mb-[50px] testing"
          icon={faFileArrowUp}
        />
        <Form>
          <Form.Group className="flex items-center px-8 gap-2">
            <Form.Control
              type="file"
              onChange={handleFileChange}
              className="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#286386] focus:border-[#286386]"
            />

            <button
              onClick={(e) => handleUpload(e)}
              className="py-2 px-[13px] bg-[whitesmoke] border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#286386] focus:border-[#286386]"
            >
              <FontAwesomeIcon
                icon={faCheck}
                className="text-[#286386] text-lg"
              />
            </button>
          </Form.Group>

          {generalError && (
            <p className="text-red-500 text-sm text-left mt-1 ml-10">
              {generalError}
            </p>
          )}
        </Form>

        <div className="flex flex-col">
          <h1 className="text-[whitesmoke] text-[20px] mt-[70px] mb-[30px]">
            Having trouble?
          </h1>
          <button className="border px-5 py-2 rounded cursor-pointer">
            <Link
              className="text-[whitesmoke] text-[15px] no-underline"
              to="/support"
            >
              Talk to Support
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
