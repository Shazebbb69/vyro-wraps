"use client";

import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Reviews", href: "/reviews" },
  { name: "FAQ", href: "/faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  const { items } = useCart();

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnnouncementBar />

      <header
        className="fixed top-9 z-40 w-full border-b border-zinc-800 bg-black/95 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center gap-3 group"
              >
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
                  <span className="text-foreground">
                    Wraps
                  </span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium tracking-wide text-muted-foreground hover:text-primary transition-colors uppercase font-heading"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-muted-foreground hover:text-primary"
                >
                  <ShoppingCart className="h-5 w-5" />

                  <span className="sr-only">
                    Cart
                  </span>

                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground font-mono">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              <div className="hidden md:block">
                <Link href="/products">
                  <Button>Shop Now</Button>
                </Link>
              </div>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger
                  asChild
                  className="md:hidden"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">
                      Toggle Menu
                    </span>
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="bg-background/95 backdrop-blur-xl"
                >
                  <SheetTitle className="mb-8 text-left text-3xl text-primary">
                    VYRO WRAPS
                  </SheetTitle>

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

                    <div className="border-t border-border/50 pt-6">
                      <Link
                        href="/products"
                        className="block"
                      >
                        <Button className="h-14 w-full text-lg">
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}