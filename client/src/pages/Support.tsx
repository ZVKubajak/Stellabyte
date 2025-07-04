import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import supportSchema, {
  responseSchema,
  Support as SupportType,
} from "../schema/supportSchema";
import authToken from "../tokens/authToken";

const Support = () => {
  const navigate = useNavigate();
  const [hasEmail, setHasEmail] = useState(true);
  const [generalError, setGeneralError] = useState("");

  let userEmail = "";

  try {
    const profile = authToken.getProfile();
    if (!profile) throw new Error("User profile not found.");
    userEmail = profile.email;
  } catch (error) {
    console.error("[Support.tsx] Failed to fetch user's profile:", error);
    Swal.fire({
      title: "Whoops!",
      text: "An unknown error has occurred. Please try again later.",
      icon: "warning",
      background: "#09203f",
      color: "#fff",
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: "Return to Home",
    }).then(() => navigate("/"));
  }

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<SupportType>({ resolver: zodResolver(supportSchema) });

  const handleForm = handleSubmit(async (data) => {
    let formEmail = userEmail;
    if (data.email) formEmail = data.email;

    try {
      const webForm = new FormData();
      webForm.append("name", data.name);
      webForm.append("email", formEmail);
      webForm.append("message", data.message);
      webForm.append("access_key", "73a6d637-0dd7-4625-ba1a-3c217cac240a");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: webForm,
      });

      const result = await response.json();
      const parsedResult = responseSchema.safeParse(result);

      if (!parsedResult.success) throw new Error("Response Error");

      if (parsedResult.data.success) {
        Swal.fire({
          title: "Message Sent!",
          text: "We'll write back to you in the coming days.",
          icon: "success",
          background: "#09203f",
          color: "#fff",
        }).then(() => {
          reset();
        });
      } else {
        Swal.fire({
          title: "Whoops!",
          text: "An error has occurred. Please try again.",
          icon: "error",
          background: "#09203f",
          color: "#fff",
        });
      }

      setGeneralError("");
    } catch (error) {
      console.error("[Support.tsx] Failed to send form:", error);
      setGeneralError("An error has occurred. Please try again.");
    }
  });

  return (
    <div className="h-screen p-4 max-w-3xl mx-auto mb-[200px]">
      <h1 className="text-2xl mt-[100px] mb-[25px] text-center text-[whitesmoke] sm:mt-40">
        Support
      </h1>

      <div className="mb-6 border p-4 sm:mx-12 md:mx-20 rounded shadow">
        <p className="text-lg mb-4 text-white text-center">
          Need help? Fill out the form below, and our team will get back to you
          as soon as possible.
        </p>
        <form className="space-y-4" onSubmit={handleForm}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-1 text-[whitesmoke]"
            >
              Name
            </label>

            <input
              type="text"
              placeholder="Enter Name"
              {...register("name")}
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-[whitesmoke]"
            >
              Email
            </label>

            {hasEmail && userEmail ? (
              <div className="flex flex-row items-center justify-between border border-[whitesmoke] rounded p-2">
                <span className="truncate text-[15px] text-[whitesmoke]">
                  {userEmail}
                </span>
                <button
                  type="button"
                  className="text-[15px] text-[whitesmoke] underline ml-4"
                  onClick={() => setHasEmail(false)}
                >
                  Change
                </button>
              </div>
            ) : (
              <input
                type="email"
                placeholder="Enter Email"
                {...register("email")}
                className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                onBlur={(e) => {
                  if (e.target.value === userEmail) setHasEmail(true);
                }}
              />
            )}

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-1 text-[whitesmoke]"
            >
              Message
            </label>

            <textarea
              placeholder="Tell us about your issue..."
              {...register("message")}
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300 min-h-[100px] max-h-[100px] h-[100px]"
            ></textarea>

            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {generalError && (
            <p className="text-red-500 text-sm mt-1">{generalError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#09203f] text-white py-3 rounded hover:bg-[#1a2c47]"
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Support;
