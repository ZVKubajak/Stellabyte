import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserFiles,
  downloadFile,
  removeFile,
} from "../services/fileServices";
import { fileSchema } from "../schema/fileSchema";
import { z } from "zod";
import auth from "../utils/auth";
import starAuth from "../utils/star";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowDown,
  faMeteor,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

type TFileSchema = z.infer<typeof fileSchema>;

const Storage = () => {
  const [userFiles, setUserFiles] = useState<TFileSchema[]>([]);

  const navigate = useNavigate();

  let userId = "";

  try {
    const profile = auth.getProfile();

    if (!profile) throw new Error("Profile not found");

    userId = profile.id;
  } catch (error) {
    console.error("Error getting user profile:", error);
  }

  const fetchFiles = async () => {
    try {
      const files = await getUserFiles(userId);
      if (!files) throw new Error("Files not found.");

      if (Array.isArray(files)) {
        setUserFiles(files);
      } else {
        setUserFiles([]);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      Swal.fire({
        title: "Whoops!",
        text: "An unknown error has occurred. Please try again later.",
        icon: "warning",
        background: "#09203f",
        color: "#fff",
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: "Return to Home",
      }).then(() => {
        navigate("/");
      });
    }
  };

  const constellizeFile = (file: TFileSchema) => {
    starAuth.generateStarToken();
    navigate("/constellation", {
      state: file,
    });
  };

  const downloadUserFile = async (
    id: string,
    userId: string,
    fileName: string
  ) => {
    try {
      await downloadFile(id, userId, fileName);
    } catch (error) {
      console.error("Error downloading user's file:", error);
      Swal.fire({
        title: "Whoops!",
        text: "An error has occurred. Please try again.",
        icon: "error",
        background: "#09203f",
        color: "#fff",
      });
    }
  };

  const removeUserFile = async (id: string, userId: string) => {
    try {
      await removeFile(id, userId);
      fetchFiles();
    } catch (error) {
      console.error("Error removing user's file:", error);
      Swal.fire({
        title: "Whoops!",
        text: "An error has occurred. Please try again.",
        icon: "error",
        background: "#09203f",
        color: "#fff",
      });
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="h-screen">
      <h1 className="text-center text-2xl text-[whitesmoke] mt-[160px]">
        Storage
      </h1>

      <div className="mt-20 space-y-8 overflow-y-auto max-h-[550px]">
        {" "}
        {/* Added max height and scroll */}
        {userFiles.length > 0 ? (
          userFiles.map((file) => (
            <div
              key={file.id}
              className="relative border-2 border-none rounded-lg w-3/4 2xl:w-2/5 p-2 mx-auto"
            >
              {/* Glass background */}
              <div className="absolute inset-0 glass shadow-none testing1"></div>

              <div className="flex relative">
                <div className="w-4/5">
                  <p className="text-[whitesmoke] font-semibold">
                    {file.fileName}
                  </p>
                  <p className="text-[whitesmoke] m-0">{file.fileType}</p>
                  <p className="text-[whitesmoke] m-0">{file.fileSize} Bytes</p>
                </div>
                <div className="w-1/5 text-xl space-x-3 text-right">
                  <FontAwesomeIcon
                    icon={faMeteor}
                    onClick={() => constellizeFile(file)}
                    className="text-[whitesmoke] cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faFileArrowDown}
                    onClick={() =>
                      downloadUserFile(file.id, file.userId, file.fileName)
                    }
                    className="text-[whitesmoke] cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => removeUserFile(file.id, file.userId)}
                    className="text-[whitesmoke] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col mt-[100px]">
            <p className="text-center text-[whitesmoke] text-2xl mb-4">
              Your storage is empty.
            </p>
            <button
              onClick={() => navigate("/upload")}
              className="text-[whitesmoke] py-2 px-3 rounded mx-28 bg-[#09203f] md:mx-auto md:w-1/4 md:text-lg xl:w-1/5"
            >
              Upload Files
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Storage;
