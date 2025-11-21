"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Login() {
  const onSubmit = (e: any) => {
    e.preventDefault();
    toast.success("Logged in!");
  };

  return (
    <div className="flex h-screen w-screen bg-white">
      <div className="hidden md:flex w-1/2 h-full overflow-hidden">
        <img
          src="https://ik.imagekit.io/pavanagulla19/lion.avif"
          alt="lion image"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-sm w-full mx-6"
        >
          {/* Title */}
          <h1 className="text-3xl font-semibold text-gray-900">Login</h1>
          <p className="text-sm mt-1 text-gray-600">
            Don’t have an account?{" "}
            <a className="text-gray-800 underline cursor-pointer">Sign up</a>
          </p>

          {/* LOGIN FORM */}
          <form onSubmit={onSubmit} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                placeholder="Write your email"
                type="email"
                className="mt-1 h-11 bg-white border-gray-300"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                placeholder="Your password"
                type="password"
                className="mt-1 h-11 bg-white border-gray-300"
              />

              {/* Forgot Password */}
              <p className="text-xs text-gray-600 text-right mt-1 cursor-pointer hover:text-gray-800 underline">
                Forgot password?
              </p>
            </div>

            {/* Login Button */}
            <Button className="w-full h-11 bg-gray-800 hover:bg-gray-900 text-white mt-2">
              Login
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
