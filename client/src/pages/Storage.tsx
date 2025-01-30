import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFiles, removeFile } from "../services/fileService";
import { fileSchema } from "../schema/fileSchema";
import { z } from "zod";
import auth from "../utils/auth";
import starAuth from "../utils/star";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMeteor } from "@fortawesome/free-solid-svg-icons";

type TFileSchema = z.infer<typeof fileSchema>;

const Storage = () => {
  const [userFiles, setUserFiles] = useState<TFileSchema[]>([]);

  const navigate = useNavigate();

  let userId = "";
  const profile = auth.getProfile();
  if (profile) {
    userId = profile.id;
  } else {
    throw new Error("Failed retrieving user.");
  }

  const fetchFiles = async () => {
    try {
      const files = await getUserFiles(userId);
      if (!files) throw Error;

      if (Array.isArray(files)) {
        setUserFiles(files);
      } else {
        setUserFiles([]);
      }
    } catch (error) {
      console.error("fetchFiles Error:", error);
      Swal.fire({
        title: "Whoops!",
        text: "An unknown error has occurred. Please try again later.",
        icon: "warning",
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

  const removeUserFile = async (id: string, userId: string) => {
    try {
      await removeFile(id, userId);
      fetchFiles();
    } catch (error) {
      console.error("removeUserFile Error:", error);
      Swal.fire({
        title: "Whoops!",
        text: "An error has occurred. Please try again.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="h-screen">
      <h1 className="text-center text-[whitesmoke] mt-[160px]">Your Files</h1>

      <div className="mt-20 space-y-8 overflow-y-auto max-h-[550px]"> {/* Added max height and scroll */}
      {userFiles.length > 0 ? (
  userFiles.map((file) => (
    <div
      key={file.id}
      className="relative border-2 border-none rounded-lg w-3/4 p-2 mx-auto"
    >
      {/* Glass background */}
      <div className="absolute inset-0 glass shadow-none testing1"></div>

      <div className="flex relative">
        <div className="w-4/5">
          <p className="text-[whitesmoke] font-semibold">{file.fileName}</p>
          <p className="text-[whitesmoke] m-0">{file.fileType}</p>
          <p className="text-[whitesmoke] m-0">{file.fileSize} Bytes</p>
        </div>
        <div className="w-1/5 text-xl space-x-2 text-right">
          <FontAwesomeIcon
            icon={faMeteor}
            onClick={() => constellizeFile(file)}
            className="text-[whitesmoke]"
          />
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => removeUserFile(file.id, file.userId)}
            className="text-[whitesmoke]"
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
            <button onClick={() => navigate("/upload")} className="text-[whitesmoke] py-2 px-3 rounded mx-28 bg-[#09203f]">
              Upload Files
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Storage;
