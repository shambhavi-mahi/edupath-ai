"use client";

import { signIn } from "next-auth/react";
import GlassCard from "@/components/shared/GlassCard";
import { Mail, Chrome } from "lucide-react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <GlassCard className="w-full max-w-md">
        <h1 className="font-poppins text-2xl font-bold text-text dark:text-white text-center mb-2">
          Welcome to EduPath AI
        </h1>
        <p className="font-inter text-sm text-text-muted text-center mb-8">
          Sign in to save progress, get exam reminders, and share reports
        </p>

        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-button font-dmsans text-sm hover:bg-card transition-colors mb-4"
        >
          <Chrome className="w-5 h-5" /> Continue with Google
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs text-text-muted font-dmsans">or</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        <form onSubmit={(e) => { e.preventDefault(); signIn("credentials", { email, password }); }} className="space-y-4">
          <div>
            <label className="font-dmsans text-sm text-text-muted mb-1 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
          </div>
          <div>
            <label className="font-dmsans text-sm text-text-muted mb-1 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" required />
          </div>
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" /> Sign In
          </button>
        </form>

        <p className="text-xs text-text-muted text-center mt-6 font-inter">
          No account? Signing in automatically creates one.
        </p>
      </GlassCard>
    </div>
  );
}
