'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

type TierData = {
  name: string
  monthlyFee: number
  perMinute: number
  extraGuest: number
  maxDistance: number
  color: string
}

const tiers: Record<string, TierData> = {
  beginner: {
    name: 'Beginner',
    monthlyFee: 20,
    perMinute: 5,
    extraGuest: 150,
    maxDistance: 10,
    color: 'bg-blue-500',
  },
  premium: {
    name: 'Premium',
    monthlyFee: 40,
    perMinute: 3,
    extraGuest: 100,
    maxDistance: 25,
    color: 'bg-purple-500',
  },
  pro: {
    name: 'Pro',
    monthlyFee: 200,
    perMinute: 2.5,
    extraGuest: 75,
    maxDistance: 50,
    color: 'bg-amber-500',
  },
}

export default function CalculatorPage() {
  const [distance, setDistance] = useState([10])
  const [flightTime, setFlightTime] = useState([15])
  const [passengers, setPassengers] = useState('1')
  const [flightsPerMonth, setFlightsPerMonth] = useState([4])

  const passengerCount = parseInt(passengers)
  const extraGuests = Math.max(0, passengerCount - 1)

  const calculateTierCost = (tier: TierData) => {
    const perFlightCost = flightTime[0] * tier.perMinute + extraGuests * tier.extraGuest
    const monthlyCost = tier.monthlyFee + perFlightCost * flightsPerMonth[0]
    return {
      perFlight: Math.round(perFlightCost),
      monthly: Math.round(monthlyCost),
    }
  }

  const tierCosts = {
    beginner: calculateTierCost(tiers.beginner),
    premium: calculateTierCost(tiers.premium),
    pro: calculateTierCost(tiers.pro),
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {'Flight Cost Calculator'}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {'Compare pricing across tiers and estimate your monthly costs.'}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="mb-6 text-xl font-semibold">{'Trip Details'}</h2>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>{'Distance'}</Label>
                      <span className="text-sm font-medium">{distance[0]} mi</span>
                    </div>
                    <Slider
                      value={distance}
                      onValueChange={setDistance}
                      min={1}
                      max={50}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>{'Flight Time'}</Label>
                      <span className="text-sm font-medium">{flightTime[0]} min</span>
                    </div>
                    <Slider
                      value={flightTime}
                      onValueChange={setFlightTime}
                      min={5}
                      max={60}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passengers">{'Passengers'}</Label>
                    <Select value={passengers} onValueChange={setPassengers}>
                      <SelectTrigger id="passengers">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Passenger' : 'Passengers'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>{'Flights per Month'}</Label>
                      <span className="text-sm font-medium">{flightsPerMonth[0]}</span>
                    </div>
                    <Slider
                      value={flightsPerMonth}
                      onValueChange={setFlightsPerMonth}
                      min={1}
                      max={20}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {Object.entries(tiers).map(([key, tier]) => {
                const costs = tierCosts[key as keyof typeof tierCosts]
                const isWithinRange = distance[0] <= tier.maxDistance

                return (
                  <Card key={key} className={`p-6 ${!isWithinRange ? 'opacity-60' : ''}`}>
                    <div className="mb-6 flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold">{tier.name}</h3>
                          {!isWithinRange && (
                            <Badge variant="destructive">
                              {'Exceeds Range'}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ${tier.monthlyFee}/month subscription + flight costs
                        </p>
                      </div>
                      <div className={`h-4 w-4 rounded-full ${tier.color}`} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 mb-6">
                      <div className="rounded-lg border border-border bg-muted/30 p-4">
                        <div className="text-sm text-muted-foreground mb-1">
                          {'Per Flight Cost'}
                        </div>
                        <div className="text-3xl font-bold">${costs.perFlight}</div>
                      </div>
                      <div className="rounded-lg border border-border bg-muted/30 p-4">
                        <div className="text-sm text-muted-foreground mb-1">
                          {'Monthly Total'}
                        </div>
                        <div className="text-3xl font-bold">${costs.monthly}</div>
                      </div>
                    </div>

                    <div className="space-y-3 rounded-lg bg-muted/30 p-4">
                      <h4 className="font-semibold text-sm">{'Cost Breakdown'}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            {'Subscription Fee'}
                          </span>
                          <span className="font-medium">${tier.monthlyFee}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            {'Flight Time'} ({flightTime[0]} min × ${tier.perMinute}/min)
                          </span>
                          <span className="font-medium">
                            ${flightTime[0] * tier.perMinute}
                          </span>
                        </div>
                        {extraGuests > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              {'Extra Guests'} ({extraGuests} × ${tier.extraGuest})
                            </span>
                            <span className="font-medium">
                              ${extraGuests * tier.extraGuest}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <span className="text-muted-foreground">
                            {'Per Flight'}
                          </span>
                          <span className="font-medium">${costs.perFlight}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            {'× {flightsPerMonth[0]} flights'}
                          </span>
                          <span className="font-medium">
                            ${costs.perFlight * flightsPerMonth[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <div>
                        <div className="font-medium text-foreground">
                          ${tier.perMinute}/min
                        </div>
                        <div>{'Flight Rate'}</div>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          ${tier.extraGuest}
                        </div>
                        <div>{'Per Guest'}</div>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {tier.maxDistance} mi
                        </div>
                        <div>{'Max Distance'}</div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          <Card className="mt-8 p-6 bg-muted/30">
            <h3 className="mb-4 text-lg font-semibold">{'Savings Analysis'}</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  ${tierCosts.beginner.monthly - tierCosts.premium.monthly > 0
                    ? tierCosts.beginner.monthly - tierCosts.premium.monthly
                    : 0}
                </div>
                <div className="text-sm text-muted-foreground">
                  {'Saved with Premium vs Beginner'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  ${tierCosts.beginner.monthly - tierCosts.pro.monthly > 0
                    ? tierCosts.beginner.monthly - tierCosts.pro.monthly
                    : 0}
                </div>
                <div className="text-sm text-muted-foreground">
                  {'Saved with Pro vs Beginner'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {tierCosts.beginner.monthly < tierCosts.premium.monthly &&
                  tierCosts.beginner.monthly < tierCosts.pro.monthly
                    ? 'Beginner'
                    : tierCosts.premium.monthly < tierCosts.pro.monthly
                    ? 'Premium'
                    : 'Pro'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {'Best Value for Your Usage'}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
