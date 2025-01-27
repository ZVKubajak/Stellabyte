import { useState } from "react";
import auth from "../utils/auth";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  let userId = "";
  let userEmail = "";
  const profile = auth.getProfile();
  if (profile) {
    userId = profile.id;
    userEmail = profile.email;
  } else {
    throw new Error("Failed retrieving user.");
  }

  const handleShowModal = () => setIsDeleteOpen(true);
  const handleCloseModal = () => setIsDeleteOpen(false);

  const handleDeleteUser = async () => {
    if (userId) {
      try {
        await deleteUser(userId);
        localStorage.removeItem("id_token");
        navigate("/");
      } catch (err) {
        throw new Error("Error deleting user.")
      }
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-4 max-w-3xl w-full">
        <h1 className="text-center text-[whitesmoke] text-2xl mb-[25px]">
          Settings
        </h1>
        <div className="mb-6 border p-4 rounded shadow flex flex-col items-center gap-6">
          <button className="text-[whitesmoke] bg-[#13547a] py-3 w-full rounded m-0 hover:bg-[#0e3a5a] transition-colors">
            Update Email
          </button>
          <button
            className="text-[whitesmoke] bg-[#ff4444] py-3 w-full rounded m-0 hover:bg-[#cc0000] transition-colors"
            onClick={handleShowModal}
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Modal for Delete Account */}
      <Modal show={isDeleteOpen} onHide={handleCloseModal} centered>
        <Modal.Header>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Are you sure you want to delete your account? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            className="w-full py-3"
            onClick={handleDeleteUser}
          >
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Settings;