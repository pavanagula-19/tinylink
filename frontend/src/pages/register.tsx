// src/pages/register.tsx
"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PATH from "@/routes/path";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { registerRequest } from "@/redux/slices/auth-slice";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  selectAuthLoading,
  selectAuthError,
} from "@/redux/selectors/auth-selector";

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(registerRequest({ fullName, email, password }));
    toast.success("Registered successfully. Please login!");
    navigate(PATH.LOGIN);
  };

  return (
    <div className="flex h-screen w-screen ">
      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-1/2 h-full overflow-hidden">
        <img
          src="https://ik.imagekit.io/pavanagulla19/lion.avif"
          alt="lion image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-sm w-full mx-6"
        >
          <h1 className="text-3xl font-semibold text-gray-900">Sign up</h1>

          <p className="text-sm mt-1 text-gray-600">
            Already have an account?{" "}
            <span
              className="text-gray-800 underline cursor-pointer"
              onClick={() => navigate(PATH.LOGIN)}
            >
              Login
            </span>
          </p>

          <form onSubmit={onSubmit} className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full name
              </label>
              <Input
                className="mt-1 h-11 "
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                className="mt-1 h-11 "
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Write your email"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                className="mt-1 h-11 "
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
              />
            </div>

            <Button
              className="w-full h-11 bg-gray-800 hover:bg-gray-900 text-white mt-2"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Join"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
