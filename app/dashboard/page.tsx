'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PilotReviewModal } from '@/components/pilot-review-modal'
import Link from 'next/link'
import { useState } from 'react'

export default function DashboardPage() {
  const [reviewingFlight, setReviewingFlight] = useState<any>(null)
  const [reviews, setReviews] = useState<Record<string, { rating: number; comment: string }>>({})

  const upcomingFlights = [
    {
      id: '1',
      date: 'December 15, 2024',
      time: '2:30 PM',
      pickup: 'Downtown Seattle',
      destination: 'SeaTac Airport',
      helicopter: 'Bell 407',
      pilotName: 'Captain Sarah Mitchell',
      status: 'confirmed',
      confirmation: 'SF-A8K2L9P3',
    },
    {
      id: '2',
      date: 'December 20, 2024',
      time: '10:00 AM',
      pickup: 'Bellevue',
      destination: 'Space Needle',
      helicopter: 'Robinson R44',
      pilotName: 'Captain James Rodriguez',
      status: 'confirmed',
      confirmation: 'SF-B7M4N1Q6',
    },
  ]

  const pastFlights = [
    {
      id: '3',
      date: 'November 28, 2024',
      pickup: 'Pike Place Market',
      destination: 'University of Washington',
      helicopter: 'Airbus EC135',
      pilotName: 'Captain Michael Chen',
      status: 'completed',
    },
    {
      id: '4',
      date: 'November 15, 2024',
      pickup: 'Downtown Seattle',
      destination: 'Alki Beach',
      helicopter: 'Bell 407',
      pilotName: 'Captain Sarah Mitchell',
      status: 'completed',
    },
  ]

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (reviewingFlight) {
      setReviews({
        ...reviews,
        [reviewingFlight.id]: { rating, comment }
      })
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage your flights and subscription.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 mb-8">
            <Card className="p-6">
              <div className="mb-2 text-sm text-muted-foreground">
                Current Plan
              </div>
              <div className="mb-4 text-2xl font-bold">Premium</div>
              <p className="mb-4 text-sm text-muted-foreground">
                $40/month • Up to 25 miles • $3/min
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/#pricing">Upgrade Plan</Link>
              </Button>
            </Card>

            <Card className="p-6">
              <div className="mb-2 text-sm text-muted-foreground">
                Flights This Month
              </div>
              <div className="mb-4 text-2xl font-bold">2</div>
              <p className="mb-4 text-sm text-muted-foreground">
                Total flight time: 27 minutes
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/booking">Book New Flight</Link>
              </Button>
            </Card>

            <Card className="p-6">
              <div className="mb-2 text-sm text-muted-foreground">
                Total Spent
              </div>
              <div className="mb-4 text-2xl font-bold">$217</div>
              <p className="mb-4 text-sm text-muted-foreground">
                Including subscription and flight costs
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/calculator">View Calculator</Link>
              </Button>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-2xl font-semibold">Upcoming Flights</h2>
              <div className="space-y-4">
                {upcomingFlights.map((flight) => (
                  <Card key={flight.id} className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                            {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
                          </Badge>
                          <span className="text-sm text-muted-foreground font-mono">
                            {flight.confirmation}
                          </span>
                        </div>
                        <div className="mb-1 text-lg font-semibold">
                          {flight.pickup} → {flight.destination}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {flight.date} at {flight.time} • {flight.helicopter}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Pilot: {flight.pilotName}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="default" size="sm" asChild>
                          <Link href={`/tracking/${flight.confirmation}`}>
                            Track Flight
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold">Past Flights</h2>
              <div className="space-y-4">
                {pastFlights.map((flight) => {
                  const review = reviews[flight.id]
                  return (
                    <Card key={flight.id} className="p-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="mb-2">
                            <Badge variant="outline">
                              {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="mb-1 text-lg font-semibold">
                            {flight.pickup} → {flight.destination}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {flight.date} • {flight.helicopter}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Pilot: {flight.pilotName}
                          </div>
                          {review && (
                            <div className="mt-2 flex items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'fill-none text-muted'
                                    }`}
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                    />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">Your rating</span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            View Receipt
                          </Button>
                          {!review && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setReviewingFlight(flight)}
                            >
                              Rate Pilot
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
      {reviewingFlight && (
        <PilotReviewModal
          flight={reviewingFlight}
          onClose={() => setReviewingFlight(null)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  )
}
