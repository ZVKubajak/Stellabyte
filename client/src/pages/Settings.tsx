import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateUserSchema, deleteUserSchema } from "../schema/userSchema";
import { userSchema } from "../schema/userSchema";
import { loginSchema } from "../schema/authSchema";
import auth from "../utils/auth";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { updateUser, deleteUser } from "../services/userService";
import { login } from "../api/authAPI";
import { useNavigate } from "react-router-dom";

type TUpdateUserSchema = z.infer<typeof updateUserSchema>;
type TLoginSchema = z.infer<typeof loginSchema>;

const Settings = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUpdateEmailOpen, setIsUpdateEmailOpen] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();

  let userId = "";
  let userEmail = "";
  const profile = auth.getProfile();
  if (profile) {
    userId = profile.id;
    userEmail = profile.email;
  } else {
    throw new Error("Failed retrieving user.");
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TUpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
  });

  const handleShowDeleteModal = () => setIsDeleteOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteOpen(false);

  const handleShowUpdateEmailModal = () => {
    setIsUpdateEmailOpen(true);
    reset();
    setGeneralError("");
  };
  const handleCloseUpdateEmailModal = () => {
    setIsUpdateEmailOpen(false);
    reset();
    setGeneralError("");
  };

  const handleUpdateEmail = async (data: TUpdateUserSchema) => {
    try {
      const result = await updateUser(userId, data.newEmail, data.password);
      const parsedResult = userSchema.safeParse(result);

      if (!parsedResult.success) {
        console.error("Result is undefined.");
        throw Error;
      }

      const loginInfo: TLoginSchema = {
        email: parsedResult.data.email,
        password: data.password,
      };

      auth.logout();
      const token = await login(loginInfo);

      if (!token) {
        console.error("Token is undefined");
        throw Error;
      }

      auth.login(token);
      handleCloseUpdateEmailModal();

      Swal.fire({
        title: "Email Updated!",
        text: `Your account is now under ${parsedResult.data.email}.`,
        icon: "success",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("handleUpdateEmail Error:", error);
      setGeneralError("An error occurred. Please try again.");
    }
  };

  const handleDeleteUser = async () => {
    try {
      handleCloseDeleteModal();

      const result = await deleteUser(userId);
      const parsedResult = deleteUserSchema.safeParse(result);

      if (!parsedResult.success) {
        console.error("Result is undefined.");
        throw Error;
      }

      Swal.fire({
        title: "Account Deleted",
        text: "Hope to see you again soon!",
        icon: "success",
      }).then(() => {
        auth.logout();
        navigate("/");
      });
    } catch (error) {
      console.error("handleDeleteUser Error:", error);
      Swal.fire({
        title: "Whoops!",
        text: "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center sm:mx-12 md:mx-20">
      <div className="p-4 max-w-3xl w-full">
        <h1 className="text-center text-[whitesmoke] text-2xl mb-[25px] sm:text-3xl md:text-4xl">
          Settings
        </h1>
        <div className="mb-6 border p-4 rounded shadow flex flex-col items-center gap-6">
          <button
            className="text-[whitesmoke] bg-[#09203f] py-3 w-full rounded m-0 hover:bg-[#0e3a5a] transition-colors"
            onClick={handleShowUpdateEmailModal}
          >
            Update Email
          </button>
          <button
            className="text-[whitesmoke] bg-[#9b1b30] py-3 w-full rounded m-0 hover:bg-[#cc0000] transition-colors"
            onClick={handleShowDeleteModal}
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Modal for Delete Account */}
      <Modal show={isDeleteOpen} onHide={handleCloseDeleteModal} centered>
        <Modal.Header style={{ backgroundColor: "#09203f", border: "none" }}>
          <Modal.Title
            style={{ color: "whitesmoke", textAlign: "center", width: "100%" }}
          >
            Delete Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#09203f",
            color: "whitesmoke",
            textAlign: "center",
          }}
        >
          Are you sure you want to delete your account? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#09203f",
            border: "none",
            justifyContent: "center",
          }}
        >
          <Button
            className="w-full py-3"
            onClick={handleDeleteUser}
            style={{
              backgroundColor: "#9b1b30",
              border: "none",
              color: "whitesmoke",
            }}
          >
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={isUpdateEmailOpen}
        onHide={handleCloseUpdateEmailModal}
        centered
      >
        <Modal.Header style={{ backgroundColor: "#09203f", border: "none" }}>
          <Modal.Title
            style={{ color: "whitesmoke", textAlign: "center", width: "100%" }}
          >
            Update Email
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleUpdateEmail)}>
          <Modal.Body
            className="space-y-4"
            style={{
              backgroundColor: "#09203f",
              color: "whitesmoke",
              textAlign: "center",
            }}
          >
            <p>Current Email: {userEmail}</p>

            <input
              type="email"
              placeholder="New Email"
              {...register("newEmail")}
              className="w-full p-2 rounded text-black"
            />
            {errors.newEmail && (
              <p className="text-red-400 text-sm text-left mt-1 ml-1">
                {errors.newEmail.message}
              </p>
            )}

            <input
              type="email"
              placeholder="Confirm Email"
              {...register("confirmEmail")}
              className="w-full p-2 rounded text-black"
            />
            {errors.confirmEmail && (
              <p className="text-red-400 text-sm text-left mt-1 ml-1">
                {errors.confirmEmail.message}
              </p>
            )}

            <input
              type="password"
              placeholder="Enter Password"
              {...register("password")}
              className="w-full p-2 rounded text-black"
            />
            {errors.password && (
              <p className="text-red-400 text-sm text-left mt-1 ml-1">
                {errors.password.message}
              </p>
            )}

            {generalError && (
              <p className="text-red-500 text-sm mb-4">{generalError}</p>
            )}
          </Modal.Body>
          <Modal.Footer
            style={{
              backgroundColor: "#09203f",
              border: "none",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3"
              style={{
                backgroundColor: "#09203f",
                border: "1px solid whitesmoke",
                color: "whitesmoke",
              }}
            >
              {isSubmitting ? "Updating..." : "Update Email"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Settings;
