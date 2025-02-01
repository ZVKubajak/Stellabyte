import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFiles, uploadFile } from "../services/fileService";
import auth from "../utils/auth";
import starAuth from "../utils/star";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generalError, setGeneralError] = useState<string>("");

  const navigate = useNavigate();

  let userId = "";
  const profile = auth.getProfile();
  if (profile) {
    userId = profile.id;
  } else {
    throw new Error("Failed retrieving user.");
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const onUpload = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (!selectedFile) {
        setGeneralError("No file selected.");
        return;
      }

      const files = await getUserFiles(userId);
      if (!files) throw Error;

      if (Array.isArray(files)) {
        for (let i = 0; i < files.length; i++) {
          if (selectedFile.name.trim() === files[i].fileName) {
            setGeneralError("File name must be unique.");
            return;
          }
        }
      }

      const uploadedFile = await uploadFile(selectedFile, userId);

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
            starAuth.generateStarToken();
            navigate("/constellation", {
              state: uploadedFile,
            });
          } else {
            setSelectedFile(null);
            setGeneralError("");
          }
        }
      });
    } catch (error) {
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

      <h1 className="text-[whitesmoke] text-2xl mt-[200px] mb-[70px]">Upload Your Files</h1>
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
              onClick={(e) => onUpload(e)}
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
