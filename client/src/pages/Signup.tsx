import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Auth from "../utils/auth"
import { signUp } from "../api/authAPI";

const signUpSchema = z
  .object({
    email: z.string().email("Invalid email."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(20, "Password can not be more than 20 characters.")
      .regex(/[a-z]/, "Password must include at least 1 lowercase letter.")
      .regex(/[A-Z]/, "Password must include at least 1 uppercase letter.")
      .regex(/\d/, "Password must include at least 1 number.")
      .regex(
        /[@$!%*?&]/,
        "Password must include at least 1 special character."
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type TSignUpSchema = z.infer<typeof signUpSchema>;

const Signup = () => {
  const [generalError, setGeneralError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    try {
      console.log("Form Data:", data);
      setGeneralError("");

      reset();
    } catch (error) {
      console.error("Signup failed:", error);
      setGeneralError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-lg w-full space-y-12">
        <div>
          <h2 className="mt-6 text-center text-2xl text-[whitesmoke]">
            Create Your Account
          </h2>
          <p className="mt-4 text-center text-base text-[whitesmoke]">
            Already have an account?
            <Link to="/login" className="ml-2 text-[whitesmoke] underline">
              Sign in here
            </Link>
          </p>
        </div>
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[whitesmoke]"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="my@email.com"
                {...register("email")}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[whitesmoke]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password123!"
                {...register("password")}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-lg"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[whitesmoke]"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-lg"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {generalError && (
            <p className="text-red-500 text-sm mt-1">{generalError}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-6 border-transparent text-lg font-medium rounded text-white bg-[#13547a] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
