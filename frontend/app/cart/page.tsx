"use client"

import * as React from "react"
import Link from "next/link"
import { Trash2, Minus, Plus, ArrowRight, ShieldCheck } from "lucide-react"
import { useCart, type CartItem } from "@/store/cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
  } = useCart()
  const [promoCode, setPromoCode] = React.useState("")

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(item.productId, item.variantId)
      return
    }
    updateQuantity(item.productId, item.variantId, newQuantity)
  }

  const subtotal = items.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  )
  const shipping = subtotal
  const total = subtotal

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen pt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wider mb-6">
            Your <span className="text-primary">Cart</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">Your cart is currently empty.</p>
          <Link href="/products">
            <Button size="lg" className="px-8 h-14 text-lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wider mb-12">
          Your <span className="text-primary">Cart</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items List */}
          <div className="w-full lg:w-2/3">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border/50 text-sm font-medium text-muted-foreground uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <div className="space-y-6 pt-6">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-border/30 pb-6 last:border-0 last:pb-0"
                >

                  {/* Product Details */}
                  <div className="col-span-1 md:col-span-6 flex gap-4">
                    <div className="w-24 h-24 bg-secondary rounded-sm overflow-hidden shrink-0 border border-border/50">
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <Link href="/product" className="font-bold text-lg hover:text-primary transition-colors font-heading tracking-wide uppercase line-clamp-1">
                        {item.name}
                      </Link>
                      <div className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
                        <span>Color:</span>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full border border-border" style={{ backgroundColor: item.variantColor }} />
                          {item.variantName}
                        </div>
                      </div>
                      <div className="font-mono mt-2 md:hidden">₹{item.price}</div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-1 md:col-span-3 flex items-center justify-between md:justify-center">
                    <div className="flex items-center border border-border rounded-sm bg-background">
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        className="p-2 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-mono text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        className="p-2 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.variantId)}
                      className="md:hidden text-destructive p-2 hover:bg-destructive/10 rounded-sm transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Total & Remove Desktop */}
                  <div className="col-span-1 md:col-span-3 flex items-center justify-between md:justify-end gap-4">
                    <div className="font-mono text-xl font-bold hidden md:block">
                      ₹{item.price * item.quantity}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.variantId)}
                      className="hidden md:flex text-muted-foreground hover:text-destructive p-2 rounded-sm transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-secondary p-8 rounded-sm border border-border sticky top-28">
              <h2 className="text-2xl font-bold font-heading uppercase tracking-wider mb-6 pb-4 border-b border-border/50">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 text-lg">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  
                  <span className="font-mono font-bold">

                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground text-right">
                    Add ₹{1500 - subtotal} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t border-border/50 pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-xl uppercase tracking-wider font-heading">Total</span>
                  <span className="font-mono font-bold text-3xl text-primary">₹{total}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-right">Taxes included. Shipping calculated at checkout.</p>
              </div>

              <Link href="/checkout" className="block w-full">
                <Button size="lg" className="w-full h-14 text-lg gap-2">
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Secure SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}