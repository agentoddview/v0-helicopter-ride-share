'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function ConfirmPage() {
  const [isConfirmed, setIsConfirmed] = useState(false)

  // Mock booking data - in a real app this would come from context/state
  const booking = {
    pickup: 'Downtown Seattle',
    pickupTime: '2:30 PM',
    destination: 'SeaTac Airport',
    date: 'December 15, 2024',
    passengers: 2,
    tier: 'Premium',
    helicopter: 'Bell 407',
    pilot: 'Captain Sarah Johnson',
    pilotExperience: '12,000+ hours',
    distance: 14.2,
    flightTime: 12,
    basePrice: 36,
    extraGuestFee: 100,
    totalPrice: 136,
  }

  const handleConfirm = () => {
    setIsConfirmed(true)
  }

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                  <svg
                    className="h-10 w-10 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {'Booking Confirmed!'}
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                {'Your helicopter flight has been confirmed. Check your email for your boarding pass and additional details.'}
              </p>

              <Card className="mb-8 p-6 text-left">
                <h2 className="mb-4 text-xl font-semibold">{'Flight Details'}</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{'Confirmation'}</span>
                    <span className="font-mono font-semibold">{'SF-' + Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{'Date & Time'}</span>
                    <span className="font-medium">{booking.date} at {booking.pickupTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{'Route'}</span>
                    <span className="font-medium">{booking.pickup} → {booking.destination}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{'Helicopter'}</span>
                    <span className="font-medium">{booking.helicopter}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{'Pilot'}</span>
                    <span className="font-medium">{booking.pilot}</span>
                  </div>
                </div>
              </Card>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/dashboard">{'View My Trips'}</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/">{'Back to Home'}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link
              href="/booking/fleet"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {'Back to Fleet Selection'}
            </Link>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {'Confirm Your Booking'}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {'Review your flight details before confirming.'}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="mb-6 text-xl font-semibold">{'Flight Information'}</h2>
                
                <div className="mb-6 flex items-center justify-between rounded-lg bg-muted/30 p-4">
                  <div>
                    <div className="mb-1 text-sm text-muted-foreground">{'Pickup'}</div>
                    <div className="text-lg font-semibold">{booking.pickup}</div>
                    <div className="text-sm text-muted-foreground">{booking.pickupTime}</div>
                  </div>
                  <svg
                    className="h-6 w-6 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  <div className="text-right">
                    <div className="mb-1 text-sm text-muted-foreground">{'Destination'}</div>
                    <div className="text-lg font-semibold">{booking.destination}</div>
                    <div className="text-sm text-muted-foreground">
                      {booking.flightTime} min flight
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-border bg-card p-4">
                    <div className="mb-2 text-sm text-muted-foreground">{'Date'}</div>
                    <div className="font-semibold">{booking.date}</div>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <div className="mb-2 text-sm text-muted-foreground">{'Passengers'}</div>
                    <div className="font-semibold">
                      {booking.passengers} {booking.passengers === 1 ? 'Passenger' : 'Passengers'}
                    </div>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <div className="mb-2 text-sm text-muted-foreground">{'Distance'}</div>
                    <div className="font-semibold">{booking.distance} miles</div>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <div className="mb-2 text-sm text-muted-foreground">{'Flight Time'}</div>
                    <div className="font-semibold">{booking.flightTime} minutes</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="mb-6 text-xl font-semibold">{'Aircraft & Crew'}</h2>
                
                <div className="mb-6 flex items-center gap-4 rounded-lg border border-border bg-card p-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                    <svg
                      className="h-8 w-8 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3l14 9-14 9V3z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-semibold">{booking.helicopter}</span>
                      <Badge>{booking.tier}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {'Premium helicopter with luxury interior'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-semibold">
                    {booking.pilot.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 font-semibold">{booking.pilot}</div>
                    <p className="text-sm text-muted-foreground">
                      {'FAA Certified • ' + booking.pilotExperience}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="mb-6 text-xl font-semibold">{'Payment Summary'}</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {'Flight Cost'} ({booking.flightTime} min × ${booking.tier === 'Premium' ? '3' : '5'}/min)
                    </span>
                    <span className="font-medium">${booking.basePrice}</span>
                  </div>
                  {booking.passengers > 1 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {'Extra Passengers'} ({booking.passengers - 1})
                      </span>
                      <span className="font-medium">${booking.extraGuestFee}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{'Subscription Tier'}</span>
                    <span className="font-medium">{booking.tier}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{'Total'}</span>
                    <span className="text-2xl font-bold">${booking.totalPrice}</span>
                  </div>
                </div>

                <div className="mb-6 rounded-lg bg-muted/30 p-4 text-sm">
                  <p className="text-muted-foreground">
                    {'Your monthly subscription fee of $' + (booking.tier === 'Premium' ? '40' : booking.tier === 'Pro' ? '200' : '20') + ' will be charged separately.'}
                  </p>
                </div>

                <Button className="w-full mb-3" size="lg" onClick={handleConfirm}>
                  {'Confirm Booking'}
                </Button>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{'Free cancellation up to 24 hours before departure'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{'Instant confirmation and boarding pass via email'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{'24/7 customer support and flight tracking'}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
