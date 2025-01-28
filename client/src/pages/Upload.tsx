import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Upload = () => {
  return (
    <div>
      <div className="text-center mt-[150px]">
        <h1 className="text-[whitesmoke]">Upload Your Files</h1>
        <FontAwesomeIcon
          icon={faFileArrowUp}
          className="text-[whitesmoke] text-6xl my-4"
        />
      </div>

      <div>
        <Form className="border">
          <Form.Group className="flex justify-between border px-8">
            <Form.Control type="file" />
            <FontAwesomeIcon icon={faCheck} />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Upload;
