"use client"

import * as React from "react"
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function TrackOrderPage() {
  const [orderId, setOrderId] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [hasSearched, setHasSearched] = React.useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock tracking
    setHasSearched(true)
  }

  return (
    <div className="flex flex-col min-h-[80vh] items-center pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl w-full py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wider mb-4">
            Track Your <span className="text-primary">Order</span>
          </h1>
          <p className="text-muted-foreground">
            Enter your order number and email address to see the latest status.
          </p>
        </div>

        <div className="bg-secondary p-8 rounded-sm border border-border mb-12">
          <form onSubmit={handleTrack} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="orderId" className="text-sm font-medium">Order Number</label>
                <Input 
                  id="orderId" 
                  value={orderId} 
                  onChange={(e) => setOrderId(e.target.value)} 
                  placeholder="e.g. VW-10492" 
                  required 
                  className="bg-background h-12" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Used at checkout" 
                  required 
                  className="bg-background h-12" 
                />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full gap-2 text-lg h-14">
              <Search className="w-5 h-5" /> Track Order
            </Button>
          </form>
        </div>

        {hasSearched && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-secondary p-8 rounded-sm border border-border">
              <div className="flex justify-between items-center mb-8 border-b border-border/50 pb-6">
                <div>
                  <h2 className="text-2xl font-bold font-heading uppercase tracking-wider">Order #{orderId || "VW-10492"}</h2>
                  <p className="text-muted-foreground mt-1">Placed on October 24, 2023</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary font-bold text-sm rounded-sm uppercase tracking-wider">
                    In Transit
                  </span>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="relative py-8">
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border/50 -translate-x-1/2 md:hidden"></div>
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border/50 -translate-y-1/2 hidden md:block"></div>
                
                <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
                  <div className="flex flex-row md:flex-col items-center gap-4 md:w-1/4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="md:text-center">
                      <p className="font-bold">Order Confirmed</p>
                      <p className="text-xs text-muted-foreground">Oct 24, 10:00 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col items-center gap-4 md:w-1/4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5" />
                    </div>
                    <div className="md:text-center">
                      <p className="font-bold">Packed</p>
                      <p className="text-xs text-muted-foreground">Oct 25, 02:30 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col items-center gap-4 md:w-1/4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 ring-4 ring-background">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div className="md:text-center">
                      <p className="font-bold text-primary">In Transit</p>
                      <p className="text-xs text-muted-foreground">Oct 26, 08:15 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col items-center gap-4 md:w-1/4 opacity-50">
                    <div className="w-10 h-10 rounded-full bg-background border-2 border-border text-muted-foreground flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="md:text-center">
                      <p className="font-bold">Delivered</p>
                      <p className="text-xs text-muted-foreground">Estimated: Oct 28</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
