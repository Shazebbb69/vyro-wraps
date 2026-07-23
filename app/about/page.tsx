import { ArrowRight, Target, Shield, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="w-full h-full bg-[url('https://placehold.co/1920x1080/1A1A1A/FFFFFF?text=About+Vyro+Wraps')] bg-cover bg-center" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold font-heading uppercase tracking-wider mb-6">
            Our <span className="text-primary">Mission</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Vyro Wraps was born out of frustration. We were tired of standard lifting straps that required two hands, cut off circulation, and degraded after just a few heavy sessions.
          </p>
        </div>
      </section>

      {/* The Story */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-square md:aspect-video lg:aspect-square bg-secondary rounded-sm overflow-hidden">
                 <img src="https://placehold.co/800x800/1A1A1A/FFFFFF?text=Our+Story" alt="Vyro Wraps Story" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-4xl font-bold font-heading uppercase tracking-wider mb-4">
                Redefining the <span className="text-primary">Standard</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                As competitive powerlifters and bodybuilders, grip strength often became the limiting factor before muscle fatigue. Traditional straps helped, but they were cumbersome. We needed something that was quick to apply, extremely secure, and durable enough to withstand daily heavy abuse.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                After 18 months of prototyping and testing with professional athletes, the Vyro Wrap was created. Our patented self-applying loop design allows you to secure yourself to the bar with one hand in seconds.
              </p>
              <div className="pt-6">
                <Link href="/product">
                  <Button size="lg" className="gap-2 text-lg h-14">
                    Experience the Difference <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-6xl">
          <h2 className="text-4xl font-bold font-heading uppercase tracking-wider mb-16">
            Core <span className="text-primary">Values</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-sm border border-border">
              <div className="w-16 h-16 mx-auto bg-primary/20 text-primary flex items-center justify-center rounded-sm mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-heading uppercase tracking-wide mb-3">Uncompromising Quality</h3>
              <p className="text-muted-foreground">We source only the highest grade materials. If it doesn't survive our rigorous stress tests, it doesn't get the Vyro name.</p>
            </div>
            
            <div className="bg-background p-8 rounded-sm border border-border">
              <div className="w-16 h-16 mx-auto bg-primary/20 text-primary flex items-center justify-center rounded-sm mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-heading uppercase tracking-wide mb-3">Performance Driven</h3>
              <p className="text-muted-foreground">Every design choice is made to enhance your lifting performance. Aesthetics follow function, never the other way around.</p>
            </div>
            
            <div className="bg-background p-8 rounded-sm border border-border">
              <div className="w-16 h-16 mx-auto bg-primary/20 text-primary flex items-center justify-center rounded-sm mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-heading uppercase tracking-wide mb-3">Community First</h3>
              <p className="text-muted-foreground">We listen to our athletes. Your feedback directly shapes our future products and improvements.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
