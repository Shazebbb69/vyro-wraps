"use client"

import * as React from "react"
import { Star, Filter } from "lucide-react"

import { ReviewCard } from "@/components/product/ReviewCard"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { reviewsData } from "@/data/mock"

export default function ReviewsPage() {
  const [filter, setFilter] = React.useState("all")
  
  // Calculate stats
  const averageRating = (reviewsData.reduce((acc, curr) => acc + curr.rating, 0) / reviewsData.length).toFixed(1)
  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviewsData.filter(r => r.rating === star).length,
    percentage: Math.round((reviewsData.filter(r => r.rating === star).length / reviewsData.length) * 100)
  }))

  const filteredReviews = filter === "all" 
    ? reviewsData 
    : reviewsData.filter(r => r.rating === parseInt(filter))

  return (
    <div className="flex flex-col min-h-screen pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12">
        <h1 className="text-4xl md:text-6xl font-bold font-heading uppercase tracking-wider mb-12 text-center">
          Customer <span className="text-primary">Reviews</span>
        </h1>

        {/* Reviews Summary Section */}
        <div className="flex flex-col md:flex-row gap-12 bg-secondary p-8 rounded-sm border border-border mb-16">
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border/50 pb-8 md:pb-0 md:pr-8">
            <h2 className="text-6xl font-bold text-foreground mb-2">{averageRating}</h2>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground font-medium">Based on {reviewsData.length} reviews</p>
            <Button className="mt-6 w-full">Write a Review</Button>
          </div>
          
          <div className="w-full md:w-2/3 flex flex-col justify-center gap-3">
            {ratingCounts.map((rc) => (
              <div key={rc.star} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-16">
                  <span className="font-bold">{rc.star}</span>
                  <Star className="w-4 h-4 text-primary fill-primary" />
                </div>
                <div className="flex-grow h-3 bg-background rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${rc.percentage}%` }}
                  />
                </div>
                <div className="w-12 text-right text-sm text-muted-foreground">
                  {rc.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and List */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h3 className="text-2xl font-bold font-heading uppercase tracking-wider">
            {filteredReviews.length} Reviews
          </h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter className="w-5 h-5 text-muted-foreground hidden sm:block" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="newest">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Rating</SelectItem>
                <SelectItem value="lowest">Lowest Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
        
        {filteredReviews.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-xl">No reviews found for this filter.</p>
            <Button variant="link" onClick={() => setFilter("all")} className="mt-4 text-primary">
              Clear Filters
            </Button>
          </div>
        )}

        {filteredReviews.length > 0 && (
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg">Load More</Button>
          </div>
        )}
      </div>
    </div>
  )
}
