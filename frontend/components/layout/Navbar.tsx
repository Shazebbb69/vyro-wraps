"use client"

import Image from "next/image"
import * as React from "react"
import Link from "next/link"
import { ShoppingCart, Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Reviews", href: "/reviews" },
  { name: "FAQ", href: "/faq" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 border-b border-transparent ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
  <Image
    src="/logo.jpeg"
    alt="Vyro Wraps Logo"
    width={48}
    height={48}
    className="object-contain"
  />

  <span className="text-3xl font-bold uppercase tracking-wider font-heading">
    <span className="text-primary group-hover:text-accent transition-colors">
      Vyro
    </span>
    <span className="text-foreground">Wraps</span>
  </span>
</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-muted-foreground hover:text-primary transition-colors uppercase font-heading text-lg"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground font-mono">
                  0
                </span>
              </Button>
            </Link>

            <div className="hidden md:block">
              <Link href="/products">
                <Button>Shop Now</Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-xl">
                <SheetTitle className="text-left mb-8 text-3xl text-primary">VYRO WRAPS</SheetTitle>
                <nav className="flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-2xl font-bold uppercase tracking-wider text-muted-foreground hover:text-primary font-heading"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-6 border-t border-border/50">
                    
                    <Link href="/product" className="block">
                      <Button className="w-full text-lg h-14">Shop Now</Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
