import React from "react";
import { useAppContext } from "../context/AppContext";

export default function Login() {
  const { setShowUserLogin, setUser } = useAppContext();

  const [state, setState] = React.useState("login");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      email: "mehdialikadiwala@gmail.com",
      name: "Mehdiali Kadiwala",
    });
    setShowUserLogin(false);
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex justify-center items-center text-sm bg-black/50"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full sm:w-87.5 text-center bg-white border border-primary rounded-2xl px-8 "
      >
        <h1 className="text-primary text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="text-gray-400 text-sm mt-2">Please sign in to continue</p>

        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-black/5 ring-2 ring-black/10 focus-within:ring-primary/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-black/75 focus-within:text-primary/60"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <circle cx="12" cy="8" r="5" />{" "}
              <path d="M20 21a8 8 0 0 0-16 0" />{" "}
            </svg>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full bg-transparent text-black-600 placeholder-black/60 border-none outline-none "
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="flex items-center mt-6 w-full bg-black/5 ring-2 ring-black/10 focus-within:ring-primary/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-black/75 focus-within:text-primary/60"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />{" "}
            <rect x="2" y="4" width="20" height="16" rx="2" />{" "}
          </svg>
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="w-full bg-transparent text-black-600 placeholder-black/60 border-none outline-none "
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mt-6 w-full bg-black/5 ring-2 ring-black/10 focus-within:ring-primary/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-black/75 focus-within:text-primary/60"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />{" "}
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />{" "}
          </svg>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent text-black-600 placeholder-black/60 border-none outline-none "
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {state === "login" ? (
          <div className="mt-4 text-left">
            <button className="text-sm text-primary-dull hover:underline">
              Forget password?
            </button>
          </div>
        ) : null}

        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white bg-primary hover:bg-primary-dull transition cursor-pointer"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>

        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="text-primary-400 hover:underline ml-1">
            click here
          </span>
        </p>
      </form>
      {/* Soft Backdrop*/}
      <div className="fixed inset-0 -z-1 pointer-events-none">
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-primary-800/35 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-primary-700/35 to-transparent rounded-full blur-2xl" />
      </div>
    </div>
  );
}
