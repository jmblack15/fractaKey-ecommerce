"use client";

import Link from "next/link";

const SignUp = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-[#f5f8fc]">
      <div className="flex flex-col justify-center text-center  shadow-2xl p-6 gap-3 rounded-lg w-80 bg-white">
        <h1 className="text-3xl font-extrabold text-[#012970] my-2">
          Create an account
        </h1>

        <p className="text-base mb-1.5 w-[75%] mx-auto">
          Enter your personal details to create account
        </p>

        <form className="flex flex-col gap-4 mx-auto mt-5">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            className="border border-gray-100 rounded w-full p-2 pl-4 h-10"
          />

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            className="border border-gray-100 rounded w-full p-2 pl-4 h-10"
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="border border-gray-100 rounded w-full p-2 pl-4 h-10"
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="border border-gray-100 rounded w-full p-2 pl-4 h-10"
          />

          <div className="w-full mt-2">
            <input type="checkbox" name="terms" id="terms" className="mr-2" />
            <label htmlFor="terms">
              I agree and accept{" "}
              <span className="text-[#4154f1] cursor-pointer">
                the terms and conditions
              </span>
            </label>
          </div>

          <button
            className="bg-blue-600 w-40 h-12 text-center rounded mx-auto text-white"
            type="submit"
          >
            Create Account
          </button>
        </form>

        <p className="mt-2 text-sm">
          Already have an account?{" "}
          <Link className="text-[#4154f1]" href={""}>
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
