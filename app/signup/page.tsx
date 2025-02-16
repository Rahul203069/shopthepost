"use client";

import { useState} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";


const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function page() {




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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
    {/* Glass card */}
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-sm mx-4 shadow-2xl border border-white/20">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to LinkFolio</h1>
        <p className="text-white/80">Manage your affiliate links with ease</p>
      </div>

      {/* Google Sign In Button */}
      <button
        onClick={() => {signIn("google", { callbackUrl: "/" })}}
        className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center space-x-3 group"
      >
    <FcGoogle></FcGoogle>
        <span>Continue with Google</span>
      </button>

      {/* Terms */}
      <p className="text-center text-white/60 text-sm mt-8">
        By continuing, you agree to our{' '}
        <a href="#" className="text-white/80 hover:text-white underline">
          Terms of Service
        </a>
        {' '}and{' '}
        <a href="#" className="text-white/80 hover:text-white underline">
          Privacy Policy
        </a>
      </p>
    </div>
  </div>
  );
}
