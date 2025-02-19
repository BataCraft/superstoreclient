"use client";

import { useState } from "react";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

import useAuthStore from "@/Store/userStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EmailVerify = () => {
  const { emailVerify, loading } = useAuthStore();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    if (otp.length !== 5) {
      toast.error("OTP must be 5 digits!");
      return;
    }
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    const success = await emailVerify(email, otp);
    if(success)
    {
      toast.success("Email verify successfully!");
      router.push("/auth/login");

    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Verify Your Email</h2>

      {/* Email Input */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-64"
      />

      {/* OTP Input */}
      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
        <InputOTPGroup>
          {[...Array(5)].map((_, index) => (
            <InputOTPSlot key={index} index={index} className="border-gray-200 border-2" />
          ))}
        </InputOTPGroup>
      </InputOTP>

      {/* Verify Button */}
      <Button onClick={handleVerify} disabled={loading} className="w-64 bg-gradient-to-r from-primaryColor to-purple-600 text-white">
        {loading ? "Verifying..." : "Verify Email"}
      </Button>
    </div>
  );
};

export default EmailVerify;
