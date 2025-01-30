import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFiles, removeFile } from "../services/fileService";
import { fileSchema } from "../schema/fileSchema";
import { z } from "zod";
import auth from "../utils/auth";
import starAuth from "../utils/star";
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

      if (Array.isArray(files)) setUserFiles(files);
    } catch (error) {
      console.error("fetchFiles Error:", error);
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
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="my-32">
      <h1 className="text-center text-[whitesmoke] text-5xl">Your Files</h1>

      <div className="mt-20 space-y-8">
        {userFiles.length > 0 ? (
          userFiles.map((file) => (
            <div
              key={file.id}
              className="bg-[whitesmoke] border-2 border-gray-500 rounded-lg w-3/4 p-2 mx-auto"
            >
              <div className="flex">
                <div className="w-4/5">
                  <p>{file.fileName}</p>
                  <p>{file.fileType}</p>
                  <p>{file.fileSize} Bytes</p>
                </div>
                <div className="w-1/5 text-xl space-x-2 text-right">
                  <FontAwesomeIcon
                    icon={faMeteor}
                    onClick={() => constellizeFile(file)}
                    className="text-purple-900"
                  />
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => removeUserFile(file.id, file.userId)}
                    className="text-red-700"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your storage is empty!</p>
        )}
      </div>
    </div>
  );
};

export default Storage;
