"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // If no Supabase config exists, just redirect to /admin (bypass login)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      router.push("/admin");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl mb-8 text-center text-gray-900" style={{ fontFamily: 'var(--font-accent), sans-serif' }}>
          ROOT SOULUTIONS ADMIN
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-gray-900"
            />
          </div>
          <div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] text-gray-900"
            />
          </div>
          
          <button
            type="submit"
            className="bg-[#2D5A27] text-white rounded-full w-full py-3 font-semibold hover:bg-opacity-90 transition"
          >
            SIGN IN
          </button>

          {error && <p className="text-red-500 text-center mt-4 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}
