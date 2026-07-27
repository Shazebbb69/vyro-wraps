import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  tag?: string
}

export function ProductCard({ id, name, price, originalPrice, image, tag }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden bg-secondary border-border/50 hover:border-primary/50 transition-colors duration-300 flex flex-col h-full">
      <Link href={`/product`} className="block relative aspect-square overflow-hidden bg-background/50">
        {tag && (
          <Badge className="absolute top-4 left-4 z-10" variant="default">
            {tag}
          </Badge>
        )}
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
      </Link>
      <CardContent className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold font-heading tracking-wide mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            <Link href={`/product`}>{name}</Link>
          </h3>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <span className="text-2xl font-mono font-bold text-primary">₹{price}</span>
          {originalPrice && (
            <span className="text-sm font-mono text-muted-foreground line-through decoration-destructive/50">
              ₹{originalPrice}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-0 border-t border-border/50">
        <Link 
          href={`/product`}
          className="w-full flex items-center justify-center gap-2 p-4 text-sm font-medium uppercase tracking-wider font-heading hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
