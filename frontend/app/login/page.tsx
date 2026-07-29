"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

const {
  data: { session },
} = await supabase.auth.getSession();

console.log("Session after login:", session);

setLoading(false);

if (error) {
  setError(error.message);
  return;
}

    alert(session ? "Session exists" : "No session");

router.push("/admin");
router.refresh();
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center pt-12">
      <div className="container mx-auto w-full max-w-md px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="bg-secondary text-primary mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full">
            <Lock className="h-8 w-8" />
          </div>

          <h1 className="mb-2 font-heading text-3xl font-bold uppercase tracking-wider md:text-4xl">
            Welcome <span className="text-primary">Back</span>
          </h1>

          <p className="text-muted-foreground">
            Sign in to your admin account
          </p>
        </div>

        <div className="bg-secondary rounded-sm border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>

              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-background"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>

              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-background"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button
              type="submit"
              size="lg"
              className="h-14 w-full gap-2 text-lg"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <ArrowRight className="h-5 w-5" />}
            </Button>
          </form>

          <div className="mt-8 border-t border-border/50 pt-6 text-center">
            <Link
              href="/"
              className="text-primary text-sm hover:underline"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}