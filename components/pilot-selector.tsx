'use client'

import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { BookingData, Pilot } from '@/app/booking/page'
import { useState, useEffect } from 'react'

const pilots: Pilot[] = [
  {
    id: 'p1',
    name: 'Captain Sarah Mitchell',
    rating: 4.9,
    totalFlights: 2847,
    yearsExperience: 12,
    avatar: 'SM',
    status: 'available',
  },
  {
    id: 'p2',
    name: 'Captain James Rodriguez',
    rating: 4.8,
    totalFlights: 3201,
    yearsExperience: 15,
    avatar: 'JR',
    status: 'available',
  },
  {
    id: 'p3',
    name: 'Captain Emily Chen',
    rating: 5.0,
    totalFlights: 1923,
    yearsExperience: 8,
    avatar: 'EC',
    status: 'available',
  },
  {
    id: 'p4',
    name: 'Captain Michael Thompson',
    rating: 4.7,
    totalFlights: 4156,
    yearsExperience: 18,
    avatar: 'MT',
    status: 'busy',
  },
]

type PilotSelectorProps = {
  bookingData: BookingData
  setBookingData: (data: BookingData) => void
}

export function PilotSelector({ bookingData, setBookingData }: PilotSelectorProps) {
  const [animatedPilots, setAnimatedPilots] = useState(pilots)

  // Simulate real-time pilot status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedPilots((prev) =>
        prev.map((pilot) => ({
          ...pilot,
          status: Math.random() > 0.7 ? 'busy' : 'available',
        })) as Pilot[]
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{'Choose Your Pilot'}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {'All pilots are certified and highly experienced'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {animatedPilots.map((pilot) => (
          <button
            key={pilot.id}
            onClick={() => setBookingData({ ...bookingData, selectedPilot: pilot })}
            disabled={pilot.status !== 'available'}
            className={`relative p-4 rounded-lg border-2 text-left transition-all ${
              bookingData.selectedPilot?.id === pilot.id
                ? 'border-primary bg-primary/5'
                : pilot.status === 'available'
                ? 'border-border hover:border-primary/50 hover:bg-muted/50'
                : 'border-border opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {pilot.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold truncate">{pilot.name}</p>
                  <div className={`w-2 h-2 rounded-full ${
                    pilot.status === 'available' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="text-sm font-medium ml-1">{pilot.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {pilot.totalFlights.toLocaleString()} flights
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {pilot.yearsExperience} years experience
                </p>
              </div>
            </div>
            {pilot.status === 'busy' && (
              <div className="absolute top-2 right-2 px-2 py-1 bg-muted rounded text-xs">
                {'Busy'}
              </div>
            )}
            {bookingData.selectedPilot?.id === pilot.id && (
              <div className="absolute top-2 right-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {!bookingData.selectedPilot && (
        <p className="text-sm text-muted-foreground mt-4 text-center">
          {'Select a pilot to continue with your booking'}
        </p>
      )}
    </Card>
  )
}
