"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Truck, RefreshCcw, ShieldCheck, Minus, Plus, ShoppingCart, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Gallery } from "@/components/product/Gallery"
import { ReviewCard } from "@/components/product/ReviewCard"
import { ProductCard } from "@/components/product/ProductCard"
import { Badge } from "@/components/ui/badge"

import { productData, reviewsData } from "@/data/mock"

export default function ProductPage() {
  const [quantity, setQuantity] = React.useState(1)
  const [selectedVariant, setSelectedVariant] = React.useState(productData.variants[0])
  const [isStickyVisible, setIsStickyVisible] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      // Show sticky cart when scrolled past main add to cart button
      setIsStickyVisible(window.scrollY > 800)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const increaseQuantity = () => setQuantity(prev => prev + 1)
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Column - Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-28">
              <Gallery images={productData.images} />
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-8">
            <div className="space-y-4">
              <Badge variant="default" className="text-xs uppercase tracking-widest px-3 py-1 mb-2">Best Seller</Badge>
              <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wide text-foreground">
                {productData.name}
              </h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                  <span className="ml-2 text-sm font-medium text-muted-foreground">
                    4.9 (124 Reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-end gap-4 pt-4 border-t border-border/50">
                <span className="text-4xl font-mono font-bold text-primary">₹{productData.price}</span>
                <span className="text-xl font-mono text-muted-foreground line-through decoration-destructive/50 pb-1">
                  ₹{productData.originalPrice}
                </span>
                <Badge variant="outline" className="ml-2 text-success border-success bg-success/10 mb-2">
                  Save ₹{productData.originalPrice - productData.price}
                </Badge>
              </div>
              <p className="text-sm font-medium text-success flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> {productData.stockStatus}
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {productData.description}
            </p>

            <div className="space-y-4 pt-4">
              <h3 className="font-heading text-xl uppercase tracking-wider">Color: {selectedVariant.name}</h3>
              <div className="flex gap-4">
                {productData.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedVariant.id === variant.id 
                        ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" 
                        : "border-transparent hover:border-border"
                    }`}
                    style={{ backgroundColor: variant.color }}
                    aria-label={`Select ${variant.name}`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="font-heading text-xl uppercase tracking-wider">Quantity</h3>
              <div className="flex items-center border border-border rounded-sm w-fit">
                <button 
                  onClick={decreaseQuantity}
                  className="p-3 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-16 text-center font-mono text-xl font-bold">{quantity}</span>
                <button 
                  onClick={increaseQuantity}
                  className="p-3 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button size="lg" variant="outline" className="w-full sm:w-1/2 gap-2 text-lg h-14 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </Button>
              <Button size="lg" className="w-full sm:w-1/2 gap-2 text-lg h-14">
                <CreditCard className="w-5 h-5" /> Buy It Now
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-8 pb-4 border-b border-border/50">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Free Shipping Nationwide</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <RefreshCcw className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">7-Day Easy Returns</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground col-span-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Secure Encrypted Checkout</span>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="specifications">
                <AccordionTrigger className="text-xl font-heading uppercase tracking-wider">Specifications</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    {productData.specifications.map((spec, i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-border/30 last:border-0">
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-medium text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-xl font-heading uppercase tracking-wider">Shipping Information</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed pt-2">
                    Orders are processed within 24 hours. Standard shipping takes 3-5 business days depending on your location. We provide full tracking information once your order is dispatched.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="returns">
                <AccordionTrigger className="text-xl font-heading uppercase tracking-wider">Return Policy</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed pt-2">
                    We stand by our quality. If you are not completely satisfied, you can return your unused wraps in their original packaging within 7 days of delivery for a full refund.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together (Placeholder) */}
      <section className="py-24 bg-secondary mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading uppercase tracking-wider">
              Frequently Bought <span className="text-primary">Together</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard 
              id="placeholder-1" 
              name="Vyro Liquid Chalk" 
              price={499} 
              image="https://placehold.co/600x600/1A1A1A/FFFFFF?text=Liquid+Chalk" 
            />
            <ProductCard 
              id="placeholder-2" 
              name="Vyro Wrist Wraps" 
              price={999} 
              image="https://placehold.co/600x600/1A1A1A/FFFFFF?text=Wrist+Wraps" 
            />
             <ProductCard 
              id="placeholder-3" 
              name="Vyro Knee Sleeves" 
              price={2499} 
              image="https://placehold.co/600x600/1A1A1A/FFFFFF?text=Knee+Sleeves" 
            />
             <ProductCard 
              id="placeholder-4" 
              name="Vyro Lifting Belt" 
              price={3999} 
              image="https://placehold.co/600x600/1A1A1A/FFFFFF?text=Lifting+Belt" 
            />
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-border pb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading uppercase tracking-wider mb-4">
                Customer <span className="text-primary">Reviews</span>
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-xl font-bold">4.9 Out of 5</span>
                <span className="text-muted-foreground text-sm">Based on 124 reviews</span>
              </div>
            </div>
            <Button variant="outline" className="mt-6 md:mt-0">Write a Review</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewsData.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar - Mobile mainly, but can show on desktop when scrolled far */}
      <AnimatePresence>
        {isStickyVisible && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-t border-border shadow-2xl p-4 md:p-6"
          >
            <div className="container mx-auto flex items-center justify-between gap-4">
              <div className="hidden md:flex items-center gap-4">
                <div className="w-16 h-16 bg-secondary rounded-sm bg-cover bg-center" style={{ backgroundImage: `url(${productData.images[0]})` }} />
                <div>
                  <h4 className="font-heading text-xl uppercase">{productData.name}</h4>
                  <div className="font-mono text-primary font-bold">₹{productData.price}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="hidden sm:flex items-center border border-border rounded-sm bg-background">
                  <button onClick={decreaseQuantity} className="p-2 hover:bg-secondary"><Minus className="w-4 h-4" /></button>
                  <span className="w-10 text-center font-mono font-bold">{quantity}</span>
                  <button onClick={increaseQuantity} className="p-2 hover:bg-secondary"><Plus className="w-4 h-4" /></button>
                </div>
                <Button size="lg" className="w-full md:w-auto min-w-[200px] h-12 text-lg">
                  Add To Cart
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
