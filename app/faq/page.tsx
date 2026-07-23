"use client"

import * as React from "react"
import { Search } from "lucide-react"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { faqData } from "@/data/mock"
import Link from "next/link"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  
  const filteredFaqs = faqData.filter(
    (faq) => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-heading uppercase tracking-wider mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Have questions? We're here to help. If you don't find the answer you're looking for, please don't hesitate to contact us.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search for answers..."
              className="pl-12 h-14 text-lg bg-secondary border-border/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-secondary p-8 rounded-sm border border-border">
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {filteredFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-background px-6 rounded-sm border border-border/50">
                  <AccordionTrigger className="text-lg hover:no-underline font-medium text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">No results found for "{searchQuery}"</p>
              <Button variant="link" onClick={() => setSearchQuery("")} className="text-primary">
                Clear Search
              </Button>
            </div>
          )}
        </div>

        <div className="mt-16 text-center bg-secondary/50 p-12 rounded-sm border border-border/50">
          <h2 className="text-2xl font-bold font-heading uppercase tracking-wider mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-8">Our support team is always ready to help you out.</p>
          <Link href="/contact">
            <Button size="lg" className="px-8">Contact Support</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
