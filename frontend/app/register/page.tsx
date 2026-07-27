"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, UserPlus } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock register action
    window.location.href = "/account"
  }

  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-primary mb-6">
            <UserPlus className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading uppercase tracking-wider mb-2">
            Create <span className="text-primary">Account</span>
          </h1>
          <p className="text-muted-foreground">Join the Vyro community</p>
        </div>

        <div className="bg-secondary p-8 rounded-sm border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <Input id="firstName" required className="h-12 bg-background" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <Input id="lastName" required className="h-12 bg-background" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email Address</label>
              <Input id="email" type="email" required className="h-12 bg-background" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input id="password" type="password" required className="h-12 bg-background" />
            </div>
            
            <Button type="submit" size="lg" className="w-full h-14 text-lg gap-2">
              Create Account <ArrowRight className="w-5 h-5" />
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-border/50 text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
