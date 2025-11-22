// src/pages/login.tsx
"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PATH from "@/routes/path";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { loginRequest } from "@/redux/slices/auth-slice";
import { useEffect, useState } from "react";
import {
  selectAuthLoading,
  selectAuthError,
  selectToken,
} from "@/redux/selectors/auth-selector";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useAppSelector(selectToken);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      toast.success("Login successful!");
      navigate(PATH.DASHBOARD, { replace: true });
    }
  }, [token]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(loginRequest({ email, password }));
  };

  return (
    <div className="flex h-screen w-screen ">
      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-1/2 h-full overflow-hidden">
        <img
          src="https://ik.imagekit.io/pavanagulla19/tiger.jpg"
          alt="tiger image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-sm w-full mx-6"
        >
          <h1 className="text-3xl font-semibold text-gray-900">Login</h1>

          <p className="text-sm mt-1 text-gray-600">
            Don’t have an account?{" "}
            <span
              className="text-gray-800 underline cursor-pointer"
              onClick={() => navigate(PATH.SIGNUP)}
            >
              Sign up
            </span>
          </p>

          <form onSubmit={onSubmit} className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                className="mt-1 h-11 "
                placeholder="Write your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                className="mt-1 h-11 "
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              className="w-full h-11 bg-gray-800 hover:bg-gray-900 text-white mt-2"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
