"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ShieldCheck,
  Dumbbell,
  Zap,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { ReviewCard } from "@/components/product/ReviewCard"

import { reviewsData } from "@/data/mock"
import {
  benefits,
  specifications,
  howToUse,
  faqData,
} from "@/data/siteContent"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative h-screen min-h-[850px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
  className="w-full h-full bg-[url('/hero.png')] bg-cover bg-center_75 opacity-40"
/>
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold uppercase tracking-wider text-foreground font-heading">
              Self Applying <span className="text-primary">Lifting Straps</span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto">
              Maximum Support. Enhanced Grip. Built To Last.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto min-w-50">
                  Shop Now
                </Button>
              </Link>

              <Link href="#how-to-use" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto min-w-50"
                >
                  See How It Works
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 pt-12 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>Premium Quality</span>
              </div>

              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary fill-primary" />
                <span>Top Rated</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-background p-8 rounded-sm border border-border/50 text-center group hover:border-primary/50 transition-colors"
              >
                <div className="mx-auto w-16 h-16 bg-secondary flex items-center justify-center rounded-sm mb-6 group-hover:scale-110 transition-transform">
                  {idx === 0 && <ShieldCheck className="w-8 h-8 text-primary" />}
                  {idx === 1 && <Dumbbell className="w-8 h-8 text-primary" />}
                  {idx === 2 && <Zap className="w-8 h-8 text-primary" />}
                  {idx === 3 && <Clock className="w-8 h-8 text-primary" />}
                </div>

                <h3 className="text-xl font-bold mb-3 font-heading tracking-wide uppercase">
                  {benefit.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative group"
            >
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />

              <div className="relative aspect-square w-full bg-secondary rounded-sm overflow-hidden border border-border">
                <img
  src="/promo-banner.jpeg"
  alt="Vyro Wraps"
  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
/>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wider">
                Engineered for <span className="text-primary">Performance</span>
              </h2>

              <p className="text-lg text-muted-foreground">
                Vyro Wraps are designed to take your heavy lifts to the next
                level. By securing your grip to the bar, you can focus entirely
                on the target muscles without worrying about your forearms
                giving out.
              </p>

              <ul className="space-y-4">
                {[
                  "100% Premium Cotton with reinforced stitching",
                  "Self-applying design for one-handed setup",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/products" className="inline-block mt-4">
                <Button size="lg" className="gap-2">
                  View Full Specs <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
            {/* Why Choose & Specifications */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wider">
              The <span className="text-primary">Vyro</span> Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold font-heading tracking-wide uppercase border-b border-border pb-4">
                Standard Straps vs Vyro Wraps
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-destructive/20 text-destructive flex items-center justify-center rounded-sm shrink-0">
                    <XIcon className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="font-bold mb-1">Standard Straps</h4>
                    <p className="text-sm text-muted-foreground">
                      Require two hands to setup, dig into wrists, fray easily
                      under heavy loads.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/20 text-green-500 flex items-center justify-center rounded-sm shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="font-bold mb-1">Vyro Wraps</h4>
                    <p className="text-sm text-muted-foreground">
                      Self-applying loop for one-handed setup, plush foam
                      padding and heavy-duty construction.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold font-heading tracking-wide uppercase border-b border-border pb-4">
                Specifications
              </h3>

              <div className="bg-background rounded-sm border border-border">
                {specifications.map((spec, i) => (
                  <div
                    key={i}
                    className={`flex justify-between p-4 ${
                      i !== specifications.length - 1
                        ? "border-b border-border"
                        : ""
                    }`}
                  >
                    <span className="font-medium text-muted-foreground">
                      {spec.label}
                    </span>

                    <span className="font-bold text-right pl-4">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How To Use */}
      <section id="how-to-use" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wider mb-4">
            How To <span className="text-primary">Apply</span>
          </h2>

          <p className="text-muted-foreground mb-16 max-w-2xl mx-auto">
            Our innovative self-applying design means you spend less time
            setting up and more time lifting.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howToUse.map((step) => (
              <motion.div
                key={step.step}
                whileHover={{ y: -5 }}
                className="relative bg-secondary p-8 rounded-sm border border-border/50 text-center pt-12"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary text-primary-foreground font-heading text-2xl flex items-center justify-center rounded-full border-4 border-background">
                  {step.step}
                </div>

                <h3 className="text-xl font-bold mb-3 font-heading tracking-wide uppercase">
                  {step.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wider mb-4">
              Trusted by <span className="text-primary">Athletes</span>
            </h2>

            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <span className="font-medium">4.9/5 Average Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviewsData.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/reviews">
              <Button variant="outline" size="lg">
                Read All Reviews
              </Button>
            </Link>
          </div>
        </div>
      </section>
            {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase tracking-wider mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-secondary px-6 rounded-sm border border-border/50"
              >
                <AccordionTrigger className="text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}