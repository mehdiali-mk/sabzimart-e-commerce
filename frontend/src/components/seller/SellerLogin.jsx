import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

export default function SellerLogin() {
  const { isSeller, setIsSeller, navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) navigate("/seller");
  }, [isSeller]);

  function onSubmitHandler(event) {
    event.preventDefault();
    setIsSeller(true);
  }

  return (
    !isSeller && (
      <div className="w-screen h-screen flex items-center justify-center">
        <form
          onSubmit={onSubmitHandler}
          className="w-full sm:w-87.5 text-center bg-white border border-primary rounded-2xl px-8 py-8 shadow-lg shadow-primary/20"
        >
          <h1 className="text-gray-400 text-3xl mt-10 font-medium">Login</h1>

          <p className="text-gray-400 text-sm mt-2">
            Please sign in to continue
          </p>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full h-11 rounded-full text-white bg-primary hover:bg-primary-dull transition cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    )
  );
}
