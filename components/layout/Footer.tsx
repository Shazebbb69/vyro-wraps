import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-4xl font-bold uppercase tracking-wider text-primary font-heading">
                Vyro<span className="text-foreground">Wraps</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm mt-4">
              Premium self-applying lifting straps designed for maximum support, enhanced grip, and built to last.
            </p>
            <div className="flex space-x-4 pt-4 text-sm font-bold">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Instagram
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                YouTube
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Facebook
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-heading tracking-wider mb-6 text-foreground uppercase">Quick Links</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/product" className="hover:text-primary transition-colors">Shop Vyro Wraps</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="/reviews" className="hover:text-primary transition-colors">Customer Reviews</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xl font-heading tracking-wider mb-6 text-foreground uppercase">Support</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-primary transition-colors">Return Policy</Link></li>
            </ul>
          </div>

          
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Vyro Wraps. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
