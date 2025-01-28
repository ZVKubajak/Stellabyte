import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../services/fileService";
import auth from "../utils/auth";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
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

  const onSubmit = async () => {
    try {
      if (!selectedFile) {
        console.error("No file selected.");
        setGeneralError("No file selected.");
        return;
      }

      const result = await uploadFile(selectedFile, userId);

      console.log(result);

      Swal.fire({
        title: "File Uploaded",
        text: "Check out your file on the storage page or upload another file.",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Go to Storage",
        cancelButtonText: "Upload More",
        cancelButtonColor: "#3ea381",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/constellation");
        }
        setSelectedFile(null);
        setGeneralError("");
      });
    } catch (error) {
      console.error("onSubmit Error:", error);
      setGeneralError("An error has occurred. Please try again.");
      Swal.fire({
        title: "Whoops!",
        text: "An error has occurred. Please check if your file is valid and is under 50MB.",
      });
    }
  };

  return (
    <div className="text-center my-[200px]">
      <h1 className="text-[whitesmoke] mb-[70px]">Upload Your Files</h1>
      <div className="flex flex-col justify-between items-center">
        <FontAwesomeIcon
          className="file-upload-icon text-[80px] text-[whitesmoke] drop-shadow-md mb-[50px] testing"
          icon={faFileArrowUp}
        />
        <Form>
          <Form.Group className="flex items-center px-8 gap-2">
            <Form.Control
              type="file"
              className="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#286386] focus:border-[#286386]"
            />
            <button className="py-2 px-[13px] bg-[whitesmoke] border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#286386] focus:border-[#286386]">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-[#286386] text-lg"
              />
            </button>
          </Form.Group>
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
