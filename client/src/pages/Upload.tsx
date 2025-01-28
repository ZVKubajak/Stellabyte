import { uploadFile } from "../services/fileService";
import auth from "../utils/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

let userId = "";
const profile = auth.getProfile();
if (profile) {
  userId = profile.id;
} else {
  throw new Error("Failed retireving user.");
}

const onSubmit = () => {};

const Upload = () => {
  return (
    <div>
      <div className="text-center mt-[150px]">
        <h1 className="text-[whitesmoke]">Upload Your Files</h1>
        <div className="flex flex-row">
          <div>
            <Form className="border">
              <Form.Group className="flex justify-between border px-8">
                <Form.Control type="file" />
                <FontAwesomeIcon icon={faCheck} />
              </Form.Group>
            </Form>
          </div>
          <div>
            <FontAwesomeIcon icon={faFileArrowUp} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
