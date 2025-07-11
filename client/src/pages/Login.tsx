import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../services/authServices";
import { loginSchema, Login as LoginType } from "../schema/authSchema";

const Login = () => {
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState<string>("");

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<LoginType>({ resolver: zodResolver(loginSchema) });

  const handleLogin = handleSubmit(async (data) => {
    try {
      await login(data);

      setGeneralError("");
      reset();

      navigate("/");
    } catch (error) {
      console.error("[Login.tsx] Failed to login user:", error);
      setGeneralError("An error occurred. Please try again.");
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-lg w-full space-y-12">
        <div className="mb-[0px]">
          <h2 className="mt-6 text-center text-2xl text-[whitesmoke]">
            Welcome Back
          </h2>
          <p className="mt-4 text-center text-base text-[whitesmoke]">
            Don't have an account yet?
            <Link to="/signup" className="ml-2 underline text-[whitesmoke]">
              Create an account
            </Link>
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleLogin}>
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
                {...register("email")}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-lg"
                placeholder="Enter email"
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
                {...register("password")}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-lg"
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
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
              className="group relative w-full flex justify-center py-3 px-6 border-transparent text-lg font-medium rounded text-white bg-[#09203f] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
