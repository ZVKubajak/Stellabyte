import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { login } from "../api/authAPI";
import { UserLogin } from "../interfaces/userLogin";

const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const [generalError, setGeneralError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    setGeneralError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      setGeneralError("Please fill out both email and password.");
      return;
    }

    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error("Failed to login", err);
      setGeneralError("Invalid email or password.");
    }
  };

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
        <form
          className="space-y-8"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[whitesmoke]"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-lg"
                placeholder="Enter email"
                value={loginData.email || ""}
                onChange={handleChange}
              />
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
                name="password"
                type="password"
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-lg"
                placeholder="Enter password"
                value={loginData.password || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {generalError && (
            <p className="text-red-500 text-sm mt-1">{generalError}</p>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-6 border-transparent text-lg font-medium rounded text-white bg-[#13547a] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;