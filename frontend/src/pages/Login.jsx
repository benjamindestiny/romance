import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoLoading from "../components/LogoLoading";
import rom from "../assets/rom.png";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const togglePassword = () => setShowPassword((prev) => !prev);

  // user.lastLogin = new Date();
  // await user.save();

  const initialValues = { email: "", password: "", remember: false };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      const { email, password } = values;
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
      );

      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login");
    } finally {
      setSubmitting(false);
    }
  };
  {
    error && (
      <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
        {error}
      </div>
    );
  }

  if (showLoader)
    return <LogoLoading onComplete={() => setShowLoader(false)} />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-pink-400">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center">
          <img src={rom} alt="Romance Logo" className="w-24 h-24 mb-3" />
          <h1 className="text-2xl font-semibold text-rose-600">Welcome back</h1>
          <p className="text-sm text-gray-500">
            Sign in to continue to{" "}
            <span className="text-rose-600">Romance</span>
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  className="mt-1 block w-full px-4 py-2 bg-white text-gray-900 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-200 placeholder-pink-600"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="mt-1 block w-full px-4 py-2 pr-10 bg-white text-gray-900 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-200 placeholder-pink-600"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.969 9.969 0 012.223-3.455M6.72 6.72A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.99 9.99 0 01-1.657 3.023M3 3l18 18"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <label className="inline-flex items-center text-sm">
                  <Field
                    type="checkbox"
                    name="remember"
                    className="h-4 w-4 text-rose-600 rounded"
                  />
                  <span className="ml-2 text-gray-600">Remember me</span>
                </label>

                <a
                  href="/forgot-password"
                  className="text-sm text-rose-600 hover:underline"
                >
                  Forgot?
                </a>
              </div>

              <button
                type="submit"
                navLink="/dashboard"
                disabled={isSubmitting}
                className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-lg shadow hover:brightness-95 focus:outline-none cursor-pointer"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-rose-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
