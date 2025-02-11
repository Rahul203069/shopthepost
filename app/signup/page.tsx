"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";


const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignupPage() {
  const { data: session } = useSession();



  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      console.log("Signup data:", data);
      // Call API for signup
    } catch (error) {
      console.error("Signup failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 px-4">
      <div className="text-white absolute z-50 top-3 left-2 font-semibold text-xl px-2">
        ShopThePost.me
      </div>
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-lg shadow-2xl p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {/* Google Signup */}
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition-all shadow-sm hover:shadow-md"
        >
          <FcGoogle size={24} />
          <span className="font-medium">Sign Up with Google</span>
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-gray-200 px-4 text-gray-500">OR</span>
          </div>
        </div>

        {/* Email Signup */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1"></p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">

              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
