"use client"

import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface ReviewCardProps {
  author: string
  rating: number
  date: string
  title: string
  content: string
}

export function ReviewCard({ author, rating, date, title, content }: ReviewCardProps) {
  return (
    <Card className="bg-secondary border-border/50 hover:border-primary/50 transition-colors duration-300">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "text-muted"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{new Date(date).toLocaleDateString()}</span>
        </div>
        <CardTitle className="text-lg font-bold font-sans tracking-normal">{title}</CardTitle>
        <CardDescription className="text-sm font-medium text-foreground">{author}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
      </CardContent>
    </Card>
  )
}
