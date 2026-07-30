"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronLeft, ShieldCheck, Lock } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/store/cart";
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { toast } = useToast();
const { items, clearCart } = useCart();

console.log(items);
  
  const subtotal = items.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
  const [shipping, setShipping] = React.useState(0);
  
  const total = subtotal + shipping

const [pincode, setPincode] = React.useState("");
if (items.length === 0) {
  return (
    <div className="container mx-auto py-24 text-center">
      <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
      <p className="text-muted-foreground mb-6">
        Add some products before checking out.
      </p>
      <Link href="/products">
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  );
}
  const handlePlaceOrder = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: total,
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      throw new Error(order.error || "Failed to create order");
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Vyro Wraps",
      description: "Purchase from Vyro Wraps",
      order_id: order.id,

      handler: async function (response: any) {
        console.log("Payment Successful!", response);

        toast({
          title: "Payment Successful 🎉",
          description: "Verifying your payment...",
        });

        // We'll verify the payment and save the order in the next step.
      },

      theme: {
        color: "#000000",
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  } catch (err: any) {
    console.error(err);

    toast({
      title: "Payment Failed",
      description: err.message,
      variant: "destructive",
    });
  }
};

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
                      
                    </SelectContent>
                  </Select>
                  
                  <Input placeholder="State" required className="h-12 bg-secondary" />
                  <Input
  placeholder="PIN Code"
  required
  className="h-12 bg-secondary"
  maxLength={6}
  value={pincode}
  onChange={(e) => {
  const value = e.target.value;
  setPincode(value);

  if (value.length === 6) {
    fetch("/api/shipping-rate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    pincode: value,
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
  }
}}
/>
                  <Input placeholder="Phone Number" type="tel" required className="col-span-1 sm:col-span-2 h-12 bg-secondary" />
                </div>
              </section>

              {/* Payment Info */}
              {/* Payment */}
<section className="space-y-6">
  <h2 className="text-xl font-bold font-heading uppercase tracking-wide border-b border-border/50 pb-2">
    3. Payment
  </h2>

  <div className="rounded-sm border border-border bg-secondary p-6">
    <div className="flex items-center gap-3">
      <ShieldCheck className="h-6 w-6 text-primary" />

      <div>
        <h3 className="font-semibold">
          Secure Payment via Razorpay
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Pay securely using Credit/Debit Cards, UPI, NetBanking,
          Wallets and more.
        </p>
      </div>
    </div>

    <div className="mt-6 flex flex-wrap gap-3">
      <span className="rounded-full border border-border px-3 py-1 text-sm">
        Visa
      </span>

      <span className="rounded-full border border-border px-3 py-1 text-sm">
        Mastercard
      </span>

      <span className="rounded-full border border-border px-3 py-1 text-sm">
        RuPay
      </span>

      <span className="rounded-full border border-border px-3 py-1 text-sm">
        UPI
      </span>

      <span className="rounded-full border border-border px-3 py-1 text-sm">
        Wallets
      </span>

      <span className="rounded-full border border-border px-3 py-1 text-sm">
        NetBanking
      </span>
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
                {items.map((item) => (
  <div key={`${item.productId}-${item.variantId}`} className="flex items-center gap-4">
    <div className="relative w-16 h-16 bg-background rounded-sm border border-border overflow-hidden shrink-0">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center rounded-full">
        {item.quantity}
      </span>
    </div>

    <div className="grow">
      <h3 className="font-medium text-sm line-clamp-1">
        {item.name}
      </h3>
      <p className="text-xs text-muted-foreground">
        {item.variantName}
      </p>
    </div>

    <div className="font-mono text-sm font-bold">
      ₹{item.price * item.quantity}
    </div>
  </div>
))}
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
