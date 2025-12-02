'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { BookingData } from '@/app/booking/page'
import Link from 'next/link'
import { useState, useEffect } from 'react'

type BookingSummaryProps = {
  bookingData: BookingData
  setBookingData: (data: BookingData) => void
  animatePrice?: boolean
}

export function BookingSummary({ bookingData, setBookingData, animatePrice }: BookingSummaryProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const calculateDistance = () => {
    if (!bookingData.pickup || !bookingData.destination) return 0

    const [lat1, lon1] = bookingData.pickup.coordinates
    const [lat2, lon2] = bookingData.destination.coordinates

    const R = 3959 // Earth's radius in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    return Math.round(distance * 10) / 10
  }

  const calculateFlightTime = () => {
    const distance = calculateDistance()
    const avgSpeed = 120 // mph
    return Math.round((distance / avgSpeed) * 60) // minutes
  }

  const getTierRates = () => {
    switch (bookingData.selectedTier) {
      case 'beginner':
        return { perMin: 5, extraGuest: 150, maxDistance: 10 }
      case 'premium':
        return { perMin: 3, extraGuest: 100, maxDistance: 25 }
      case 'pro':
        return { perMin: 2.5, extraGuest: 75, maxDistance: 50 }
      default:
        return { perMin: 3, extraGuest: 100, maxDistance: 25 }
    }
  }

  const calculatePrice = () => {
    const flightTime = calculateFlightTime()
    const rates = getTierRates()
    const flightCost = flightTime * rates.perMin
    const guestCost = (bookingData.passengers - 1) * rates.extraGuest
    const weatherSurcharge = (flightCost + guestCost) * bookingData.weatherImpact
    return Math.round(flightCost + guestCost + weatherSurcharge)
  }

  const calculateETA = () => {
    const flightTime = calculateFlightTime()
    const eta = new Date(currentTime.getTime() + flightTime * 60000)
    return eta.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  const distance = calculateDistance()
  const flightTime = calculateFlightTime()
  const price = calculatePrice()
  const rates = getTierRates()
  const eta = calculateETA()

  const isValidRoute = bookingData.pickup && bookingData.destination && distance <= rates.maxDistance

  return (
    <Card className="p-6 sticky top-24">
      <h2 className="mb-6 text-xl font-semibold">{'Booking Summary'}</h2>

      <div className="space-y-6">
        {bookingData.pickup && bookingData.destination && (
          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                <p className="text-2xl font-bold mt-1">{eta}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Travel Time</p>
                <p className="text-xl font-semibold mt-1">{flightTime} min</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="tier">{'Subscription Tier'}</Label>
          <Select
            value={bookingData.selectedTier}
            onValueChange={(value) =>
              setBookingData({ ...bookingData, selectedTier: value })
            }
          >
            <SelectTrigger id="tier">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">{'Beginner - $20/mo'}</SelectItem>
              <SelectItem value="premium">{'Premium - $40/mo'}</SelectItem>
              <SelectItem value="pro">{'Pro - $200/mo'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="passengers">{'Number of Passengers'}</Label>
          <Select
            value={bookingData.passengers.toString()}
            onValueChange={(value) =>
              setBookingData({ ...bookingData, passengers: parseInt(value) })
            }
          >
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

        <div className={`rounded-lg border border-border bg-muted/30 p-4 space-y-3 transition-all duration-300 ${
          animatePrice ? 'scale-105 border-primary/50' : ''
        }`}>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{'Distance'}</span>
            <span className="font-medium">
              {distance > 0 ? `${distance} mi` : '—'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{'Flight Time'}</span>
            <span className="font-medium">
              {flightTime > 0 ? `${flightTime} min` : '—'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{'Base Rate'}</span>
            <span className="font-medium">${rates.perMin}/min</span>
          </div>
          {bookingData.passengers > 1 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{'Extra Guests'}</span>
              <span className="font-medium">
                {bookingData.passengers - 1} × ${rates.extraGuest}
              </span>
            </div>
          )}
          {bookingData.weatherImpact > 0 && (
            <div className="flex items-center justify-between text-sm text-orange-500">
              <span>{'Weather Surcharge'}</span>
              <span className="font-medium">
                +{(bookingData.weatherImpact * 100).toFixed(0)}%
              </span>
            </div>
          )}
          <div className="border-t border-border pt-3 flex items-center justify-between">
            <span className="font-semibold">{'Total'}</span>
            <span className="text-2xl font-bold">
              {price > 0 ? `$${price}` : '—'}
            </span>
          </div>
        </div>

        {distance > rates.maxDistance && distance > 0 && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {'Distance exceeds tier limit. Upgrade to a higher tier.'}
          </div>
        )}

        <Button
          className="w-full"
          size="lg"
          disabled={!isValidRoute || !bookingData.selectedPilot}
          asChild={isValidRoute && bookingData.selectedPilot !== null}
        >
          {isValidRoute && bookingData.selectedPilot ? (
            <Link href="/booking/fleet">{'Continue to Fleet Selection'}</Link>
          ) : (
            <span>
              {!isValidRoute ? 'Select Route to Continue' : 'Select a Pilot to Continue'}
            </span>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          {'By continuing, you agree to our Terms of Service and Privacy Policy.'}
        </p>
      </div>
    </Card>
  )
}
