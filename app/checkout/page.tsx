"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronLeft, ShieldCheck, Lock } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { productData } from "@/data/mock"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { toast } = useToast()
  
  // Mock data for checkout summary
  const subtotal = 1498 // 2 items at 749
  const shipping = 150
  const total = subtotal + shipping

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Order Placed Successfully!",
      description: "You will receive a confirmation email shortly.",
    })
    // In a real app, this would redirect to an order confirmation page
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Checkout Header */}
      <header className="border-b border-border bg-secondary py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl font-bold uppercase tracking-wider text-primary font-heading">
              Vyro<span className="text-foreground">Wraps</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 text-muted-foreground font-medium text-sm">
            <Lock className="w-4 h-4" /> Secure Checkout
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12 flex-grow">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Left Column - Checkout Form */}
          <div className="w-full lg:w-3/5 space-y-12">
            
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold font-heading uppercase tracking-wider">Checkout</h1>
              <Link href="/cart" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" /> Return to Cart
              </Link>
            </div>

            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-12">
              {/* Contact Info */}
              <section className="space-y-6">
                <div className="flex justify-between items-end border-b border-border/50 pb-2">
                  <h2 className="text-xl font-bold font-heading uppercase tracking-wide">1. Contact Information</h2>
                  <span className="text-sm text-muted-foreground">Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link></span>
                </div>
                <div className="space-y-4">
                  <Input type="email" placeholder="Email Address" required className="h-12 bg-secondary" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" id="newsletter" className="rounded-sm border-border bg-secondary text-primary focus:ring-primary h-4 w-4" defaultChecked />
                    <label htmlFor="newsletter">Email me with news and offers</label>
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="space-y-6">
                <h2 className="text-xl font-bold font-heading uppercase tracking-wide border-b border-border/50 pb-2">2. Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="First Name" required className="h-12 bg-secondary" />
                  <Input placeholder="Last Name" required className="h-12 bg-secondary" />
                  <Input placeholder="Address Line 1" required className="col-span-1 sm:col-span-2 h-12 bg-secondary" />
                  <Input placeholder="Apartment, suite, etc. (optional)" className="col-span-1 sm:col-span-2 h-12 bg-secondary" />
                  <Input placeholder="City" required className="h-12 bg-secondary" />
                  
                  <Select required defaultValue="IN">
                    <SelectTrigger className="h-12 bg-secondary">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input placeholder="State" required className="h-12 bg-secondary" />
                  <Input placeholder="PIN Code" required className="h-12 bg-secondary" />
                  <Input placeholder="Phone Number" type="tel" required className="col-span-1 sm:col-span-2 h-12 bg-secondary" />
                </div>
              </section>

              {/* Payment Info */}
              <section className="space-y-6">
                <h2 className="text-xl font-bold font-heading uppercase tracking-wide border-b border-border/50 pb-2">3. Payment</h2>
                <p className="text-sm text-muted-foreground">All transactions are secure and encrypted.</p>
                <div className="bg-secondary p-6 rounded-sm border border-border space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                    <input type="radio" id="card" name="payment" className="h-4 w-4 text-primary focus:ring-primary bg-background border-border" defaultChecked />
                    <label htmlFor="card" className="font-medium">Credit / Debit Card</label>
                  </div>
                  
                  <div className="space-y-4">
                    <Input placeholder="Card Number" required className="h-12 bg-background font-mono" />
                    <Input placeholder="Name on Card" required className="h-12 bg-background" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Expiration Date (MM/YY)" required className="h-12 bg-background font-mono" />
                      <Input placeholder="CVV" required className="h-12 bg-background font-mono" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <input type="radio" id="upi" name="payment" className="h-4 w-4 text-primary focus:ring-primary bg-background border-border" />
                    <label htmlFor="upi" className="font-medium">UPI / NetBanking</label>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <input type="radio" id="cod" name="payment" className="h-4 w-4 text-primary focus:ring-primary bg-background border-border" />
                    <label htmlFor="cod" className="font-medium">Cash on Delivery</label>
                  </div>
                </div>
              </section>

              <Button form="checkout-form" type="submit" size="lg" className="w-full h-16 text-xl tracking-wider font-heading uppercase">
                Place Order - ₹{total}
              </Button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-2/5">
            <div className="bg-secondary p-8 rounded-sm border border-border sticky top-12">
              <h2 className="text-2xl font-bold font-heading uppercase tracking-wider mb-6 pb-4 border-b border-border/50">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                {/* Mock Item 1 */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 bg-background rounded-sm border border-border overflow-hidden shrink-0">
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${productData.images[0]})` }} />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center rounded-full">
                      2
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm line-clamp-1">{productData.name}</h3>
                    <p className="text-xs text-muted-foreground">Color: Obsidian Black</p>
                  </div>
                  <div className="font-mono text-sm font-bold">₹1498</div>
                </div>
              </div>

              <div className="space-y-4 mb-6 pt-6 border-t border-border/50 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-mono font-bold">₹{shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="font-mono font-bold">Included</span>
                </div>
              </div>

              <div className="border-t border-border/50 pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-xl uppercase tracking-wider font-heading">Total</span>
                  <span className="font-mono font-bold text-3xl text-primary">₹{total}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground bg-background p-4 rounded-sm border border-border/50">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                  <span>Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
