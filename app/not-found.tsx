import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
        <h1 className="text-8xl md:text-9xl font-bold font-heading uppercase tracking-wider text-primary mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold font-heading uppercase tracking-wider mb-6">
          Page Not Found
        </h2>
        <p className="text-xl text-muted-foreground mb-12">
          It looks like the page you are looking for has been moved, deleted, or simply doesn't exist.
        </p>
        
        <Link href="/">
          <Button size="lg" className="gap-2 h-14 text-lg">
            <ArrowLeft className="w-5 h-5" /> Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  )
}
