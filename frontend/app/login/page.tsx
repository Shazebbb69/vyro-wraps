"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Lock } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login action
    window.location.href = "/account"
  }

  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-primary mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading uppercase tracking-wider mb-2">
            Welcome <span className="text-primary">Back</span>
          </h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <div className="bg-secondary p-8 rounded-sm border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email Address</label>
              <Input id="email" type="email" required className="h-12 bg-background" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <Input id="password" type="password" required className="h-12 bg-background" />
            </div>
            
            <Button type="submit" size="lg" className="w-full h-14 text-lg gap-2">
              Sign In <ArrowRight className="w-5 h-5" />
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-border/50 text-center">
            <p className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary font-medium hover:underline">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
