import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import auth from "../utils/auth";
import Swal from "sweetalert2";

const supportSchema = z.object({
  name: z.string().max(50, "Name can not be more than 50 letters."),
  email: z.string().email("Invalid email."),
  message: z.string().max(1000, "Message can not be more than 1000 letters."),
});

type TSupportSchema = z.infer<typeof supportSchema>;

const Support = () => {
  const [hasEmail, setHasEmail] = useState(true);

  let userEmail = "";
  const profile = auth.getProfile();
  if (profile) userEmail = profile.email;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSupportSchema>({
    resolver: zodResolver(supportSchema),
  });

  const onSubmit = async (data: TSupportSchema) => {
    try {
      const webForm = new FormData();
      webForm.append("name", data.name);
      webForm.append("email", data.email);
      webForm.append("message", data.message);
      webForm.append("access_key", "73a6d637-0dd7-4625-ba1a-3c217cac240a");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: webForm,
      });

      const parsedResponse = await response.json();

      if (parsedResponse.success) {
        reset();
        Swal.fire({
          title: "Success!",
          text: "Form Submitted Successfully.",
          icon: "success",
        });
      } else {
        console.error("Web3Form Error:", parsedResponse);
        Swal.fire({
          title: "An error has occurred!",
          text: "Please try again later.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("onSubmit Error:", error);
      Swal.fire({
        title: "An error has occurred!",
        text: "Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div className="h-screen p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl mt-[100px] mb-[25px] text-center text-[whitesmoke]">
        Support
      </h1>

      <div className="mb-6 border p-4 rounded shadow">
        <p className="text-lg mb-4 text-white text-center">
          Need help? Fill out the form below, and our team will get back to you
          as soon as possible.
        </p>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-1 text-[whitesmoke]"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
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
                <span className="text-[15px] text-[whitesmoke]">
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
                name="email"
                placeholder="Enter your email"
                className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                required
                onBlur={(e) => {
                  if (e.target.value === userEmail) setHasEmail(true);
                }}
              />
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
              name="message"
              placeholder="Tell us about your issue..."
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300 min-h-[100px] max-h-[100px] h-[100px]"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#13547a] text-white py-3 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Support;
