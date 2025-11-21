"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PATH from "@/routes/path";

export default function Register() {
  const onSubmit = (e: any) => {
    e.preventDefault();
    toast.success("Registered!");
  };

  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen bg-white">
      {/* LEFT IMAGE PANEL */}
      <div className="hidden md:flex w-1/2 h-full overflow-hidden">
        <img
          src="https://ik.imagekit.io/pavanagulla19/lion.avif"
          alt="lion image"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-sm w-full mx-6"
        >
          {/* Title */}
          <h1 className="text-3xl font-semibold text-gray-900">Sign up</h1>
          <p className="text-sm mt-1 text-gray-600">
            Already have an account?{" "}
            <a
              className="text-gray-800 underline cursor-pointer"
              onClick={() => navigate(PATH.LOGIN)}
            >
              Login
            </a>
          </p>

          {/* FORM */}
          <form onSubmit={onSubmit} className="space-y-4">
            {/* FULL NAME */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full name
              </label>
              <Input
                placeholder="John Doe"
                type="text"
                className="mt-1 h-11 bg-white border-gray-300"
              />
            </div>

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
                placeholder="Minimum 8 characters"
                type="password"
                className="mt-1 h-11 bg-white border-gray-300"
              />
            </div>

            {/* Join Button */}
            <Button className="w-full h-11 bg-gray-800 hover:bg-gray-900 text-white mt-2">
              Join
            </Button>
          </form>

          {/* Terms */}
          <p className="text-xs text-gray-500 mt-4">
            By joining, you agree to the{" "}
            <span className="underline cursor-pointer">Terms</span> and{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
