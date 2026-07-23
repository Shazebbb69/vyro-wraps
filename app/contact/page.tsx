"use client"

import * as React from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you shortly.",
    })
  }

  return (
    <div className="flex flex-col min-h-screen pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold font-heading uppercase tracking-wider mb-6">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Whether you have a question about our wraps, need help with an order, or just want to talk training, we're here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold font-heading uppercase tracking-wider mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-secondary flex items-center justify-center rounded-sm text-primary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                    <p className="text-muted-foreground mb-2">For general inquiries and support.</p>
                    <a href="mailto:support@vyrowraps.com" className="text-primary font-medium hover:underline text-lg">
                      support@vyrowraps.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-secondary flex items-center justify-center rounded-sm text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Call Us</h3>
                    <p className="text-muted-foreground mb-2">Mon-Fri from 9am to 6pm IST.</p>
                    <a href="tel:+919876543210" className="text-primary font-medium hover:underline text-lg">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-secondary flex items-center justify-center rounded-sm text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Headquarters</h3>
                    <p className="text-muted-foreground mb-2 text-lg">
                      Vyro Athletics Pvt. Ltd.<br />
                      123 Fitness Hub, Sector 45<br />
                      Gurugram, Haryana 122003<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary p-8 rounded-sm border border-border">
              <h3 className="text-xl font-bold font-heading uppercase tracking-wider mb-4">Wholesale Inquiries</h3>
              <p className="text-muted-foreground mb-6">Interested in stocking Vyro Wraps in your gym or retail store?</p>
              <Button variant="outline" className="w-full">Apply for Wholesale</Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-secondary p-8 md:p-12 rounded-sm border border-border">
            <h2 className="text-3xl font-bold font-heading uppercase tracking-wider mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                  <Input id="firstName" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                  <Input id="lastName" required className="bg-background" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <Input id="email" type="email" required className="bg-background" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="orderNum" className="text-sm font-medium text-muted-foreground">Order Number (Optional)</label>
                <Input id="orderNum" className="bg-background" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea id="message" required className="min-h-[150px] bg-background" />
              </div>
              
              <Button type="submit" size="lg" className="w-full gap-2 text-lg h-14">
                <Send className="w-5 h-5" /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
