import { useState } from "react";
import auth from "../utils/auth";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { deleteUser, updateUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUpdateEmailOpen, setIsUpdateEmailOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let userId = "";
  let userEmail = "";
  const profile = auth.getProfile();
  if (profile) {
    userId = profile.id;
    userEmail = profile.email;
  } else {
    throw new Error("Failed retrieving user.");
  }

  const handleShowDeleteModal = () => setIsDeleteOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteOpen(false);

  const handleShowUpdateEmailModal = () => {
    setIsUpdateEmailOpen(true);
    setNewEmail("");
    setConfirmEmail("");
    setErrorMessage("");
  };
  const handleCloseUpdateEmailModal = () => setIsUpdateEmailOpen(false);

  const handleDeleteUser = async () => {
    if (userId) {
      try {
        await deleteUser(userId);
        localStorage.removeItem("id_token");
        navigate("/");
      } catch (err) {
        throw new Error("Error deleting user.");
      }
    }
  };

  const handleUpdateEmail = async () => {

    setErrorMessage("");

    if (!newEmail || !confirmEmail) {
      setErrorMessage("Please fill in both email fields.");
      return;
    }

    if (newEmail !== confirmEmail) {
      setErrorMessage("Emails do not match.");
      return;
    }

    if (newEmail === userEmail) {
      setErrorMessage("New email must be different from the current email.");
      return;
    }

    if (userId) {
      try {
        await updateUser(userId, newEmail);
        handleCloseUpdateEmailModal();
        auth.logout();
        navigate("/")
      } catch (err) {
        setErrorMessage("Error updating email. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-4 max-w-3xl w-full">
        <h1 className="text-center text-[whitesmoke] text-2xl mb-[25px]">
          Settings
        </h1>
        <div className="mb-6 border p-4 rounded shadow flex flex-col items-center gap-6">
          <button
            className="text-[whitesmoke] bg-[#13547a] py-3 w-full rounded m-0 hover:bg-[#0e3a5a] transition-colors"
            onClick={handleShowUpdateEmailModal}
          >
            Update Email
          </button>
          <button
            className="text-[whitesmoke] bg-[#ff4444] py-3 w-full rounded m-0 hover:bg-[#cc0000] transition-colors"
            onClick={handleShowDeleteModal}
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Modal for Delete Account */}
      <Modal show={isDeleteOpen} onHide={handleCloseDeleteModal} centered>
        <Modal.Header style={{ backgroundColor: "#13547a", border: "none" }}>
          <Modal.Title
            style={{ color: "whitesmoke", textAlign: "center", width: "100%" }}
          >
            Delete Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#13547a",
            color: "whitesmoke",
            textAlign: "center",
          }}
        >
          Are you sure you want to delete your account? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#13547a",
            border: "none",
            justifyContent: "center",
          }}
        >
          <Button
            className="w-full py-3"
            onClick={handleDeleteUser}
            style={{
              backgroundColor: "#ff4444",
              border: "none",
              color: "whitesmoke",
            }}
          >
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Update Email */}
      <Modal show={isUpdateEmailOpen} onHide={handleCloseUpdateEmailModal} centered>
        <Modal.Header style={{ backgroundColor: "#13547a", border: "none" }}>
          <Modal.Title
            style={{ color: "whitesmoke", textAlign: "center", width: "100%" }}
          >
            Update Email
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#13547a",
            color: "whitesmoke",
            textAlign: "center",
          }}
        >
          {/* Current Email */}
          <p className="mb-4">Current Email: {userEmail}</p>

          {/* New Email Input */}
          <input
            type="email"
            placeholder="Enter new email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full p-2 rounded text-black mb-4"
          />

          {/* Confirm New Email Input */}
          <input
            type="email"
            placeholder="Confirm new email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            className="w-full p-2 rounded text-black mb-4"
          />

          {/* Validation Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#13547a",
            border: "none",
            justifyContent: "center",
          }}
        >
          <Button
            className="w-full py-3"
            onClick={handleUpdateEmail}
            style={{
              backgroundColor: "#13547a",
              border: "1px solid whitesmoke",
              color: "whitesmoke",
            }}
          >
            Update Email
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Settings;