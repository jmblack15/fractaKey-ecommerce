"use client";
import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/router";

import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  isTerms?: string;
  backError?: string;
}

const SignUp = () => {
  const router = useRouter();

  const [isLoading, setIsloading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isTerms, setIsTerms] = useState(true);

  const [dataForm, setDataForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorsForm, setErrorsForm] = useState<ValidationErrors>({});

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  useEffect(() => {
    setErrorsForm({});
  }, [dataForm, isTerms]);

  const handleSubmit = async () => {
    const errors: ValidationErrors = {};

    if (!isTerms) {
      errors.isTerms = "This field is required";
    }

    if (!dataForm.name.trim()) {
      errors.name = "Name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!dataForm.email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(dataForm.email)) {
      errors.email = "Invalid email format.";
    }

    if (!dataForm.password) {
      errors.password = "Password is required.";
    } else if (dataForm.password.length < 4) {
      errors.password = "Password must be at least 4 characters.";
    }

    if (!dataForm.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (dataForm.password !== dataForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      setErrorsForm(errors);
      return;
    } else {
      setIsloading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_FRACTAKEY_API}/user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: dataForm.name,
              email: dataForm.email,
              password: dataForm.password,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          console.log(data);
          setErrorsForm({ backError: data.error });
        } else {
          router.push("/");
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#f5f8fc]">
      <div className="flex flex-col justify-center text-center  shadow-2xl p-6 gap-3 rounded-lg w-80 bg-white h-[600px]">
        {isLoading ? (
          <div className="flex justify-center items-center gap-4 cursor-wait">
            <p>Loading...</p>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
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
                className={`border border-gray-100 rounded w-full p-2 pl-4 h-10 ${
                  errorsForm.name ? "border-red-500" : null
                }`}
                value={dataForm.name}
                onChange={handleInput}
              />

              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                className={`border border-gray-100 rounded w-full p-2 pl-4 h-10 ${
                  errorsForm.email ? "border-red-500" : null
                }`}
                value={dataForm.email}
                onChange={handleInput}
              />

              <div className="relative w-full">
                <input
                  type={isShowPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className={`border border-gray-100 rounded w-full p-2 pl-4 h-10 ${
                    errorsForm.password ? "border-red-500" : null
                  }`}
                  value={dataForm.password}
                  onChange={handleInput}
                />

                <button
                  type="button"
                  onClick={() => setIsShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#4154f1] cursor-pointer"
                >
                  {isShowPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>

              <div className="relative w-full">
                <input
                  type={isShowPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={dataForm.confirmPassword}
                  className={`border border-gray-100 rounded w-full p-2 pl-4 h-10 ${
                    errorsForm.name ? "border-red-500" : null
                  }`}
                  onChange={handleInput}
                />
              </div>

              <div className="w-full mt-2">
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  className="mr-2"
                  checked={isTerms}
                  onChange={() => setIsTerms((prev) => !prev)}
                />
                <label htmlFor="terms">
                  I agree and accept{" "}
                  <span className="text-[#4154f1] cursor-pointer">
                    the terms and conditions
                  </span>
                </label>
              </div>

              <div>
                <p className="text-red-500 text-base">
                  {errorsForm.isTerms ? `${errorsForm.isTerms}` : null}
                  {errorsForm.backError ? `${errorsForm.backError}` : null}
                </p>
              </div>

              <button
                className="bg-blue-600 w-40 h-12 text-center rounded mx-auto text-white cursor-pointer hover:bg-blue-400"
                type="button"
                onClick={handleSubmit}
              >
                Create Account
              </button>
            </form>

            <p className="mt-2 text-sm">
              Already have an account?{" "}
              <Link className="text-[#4154f1]" href={"/logIn"}>
                Log in
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
};

export default SignUp;
